import { Inject, Injectable, Logger, OnModuleDestroy } from '@nestjs/common';
import { Worker } from 'bullmq';
import IORedis from 'ioredis';
import { Pool } from 'pg';
import fetch from 'node-fetch';

@Injectable()
export class QueueWorker implements OnModuleDestroy {
  private readonly logger = new Logger(QueueWorker.name);
  private readonly connection: IORedis;
  private readonly worker: Worker;

  constructor(
    @Inject('CONFIG') private readonly config: Record<string, string | undefined>,
    @Inject('PG_POOL') private readonly pool: Pool
  ) {
    this.connection = new IORedis(this.config.redisUrl ?? 'redis://localhost:6379', {
      maxRetriesPerRequest: null
    });

    this.worker = new Worker(
      'post-scheduler',
      async (job) => {
        if (job.name === 'publish') {
          const { postId } = job.data as { postId: string };
          await this.publishPost(postId);
        }
      },
      {
        connection: this.connection
      }
    );

    this.worker.on('failed', async (job, err) => {
      this.logger.error(`Job ${job?.id} failed: ${err.message}`);
      const postId = (job?.data as { postId?: string } | undefined)?.postId;
      if (postId) {
        await this.pool.query('UPDATE posts SET status = $1 WHERE id = $2', ['failed', postId]);
      }
    });
  }

  async onModuleDestroy() {
    await this.worker.close();
    await this.connection.quit();
  }

  private async publishPost(postId: string) {
    const result = await this.pool.query(
      'SELECT posts.id, posts.content, users.access_token, users.linkedin_id FROM posts JOIN users ON posts.user_id = users.id WHERE posts.id = $1',
      [postId]
    );

    if (result.rows.length === 0) {
      this.logger.warn(`Post ${postId} not found for publishing.`);
      return;
    }

    const post = result.rows[0] as {
      id: string;
      content: string;
      access_token: string;
      linkedin_id: string;
    };

    const response = await fetch('https://api.linkedin.com/v2/ugcPosts', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${post.access_token}`,
        'X-Restli-Protocol-Version': '2.0.0',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        author: `urn:li:person:${post.linkedin_id}`,
        lifecycleState: 'PUBLISHED',
        specificContent: {
          'com.linkedin.ugc.ShareContent': {
            shareCommentary: { text: post.content },
            shareMediaCategory: 'NONE'
          }
        },
        visibility: {
          'com.linkedin.ugc.MemberNetworkVisibility': 'PUBLIC'
        }
      })
    });

    if (!response.ok) {
      const body = await response.text();
      throw new Error(`LinkedIn publish failed: ${response.status} ${body}`);
    }

    await this.pool.query('UPDATE posts SET status = $1 WHERE id = $2', ['published', postId]);
    this.logger.log(`Published post ${postId}`);
  }
}
