import { Inject, Logger } from '@nestjs/common';
import { Worker } from 'bullmq';
import { Pool } from 'pg';
import fetch from 'node-fetch';

export class QueueWorker {
  private readonly logger = new Logger(QueueWorker.name);
  private readonly worker: Worker;

  constructor(
    @Inject('CONFIG') private readonly config: Record<string, string | undefined>,
    @Inject('PG_POOL') private readonly pool: Pool
  ) {
    this.worker = new Worker(
      'post-scheduler',
      async (job) => {
        if (job.name !== 'publish') {
          return;
        }
        const { postId } = job.data as { postId: string };
        await this.publishPost(postId);
      },
      {
        connection: this.config.redisUrl ? { url: this.config.redisUrl } : undefined
      }
    );

    this.worker.on('failed', (job, err) => {
      this.logger.error(`Job ${job?.id} failed: ${err.message}`);
    });
  }

  private async publishPost(postId: string) {
    const result = await this.pool.query(
      'SELECT posts.id, posts.content, users.access_token FROM posts JOIN users ON posts.user_id = users.id WHERE posts.id = $1',
      [postId]
    );

    if (result.rows.length === 0) {
      this.logger.warn(`Post ${postId} not found for publishing.`);
      return;
    }

    const post = result.rows[0];
    if (!post.access_token) {
      throw new Error('Missing LinkedIn access token.');
    }

    this.logger.log(`Publishing post ${postId} to LinkedIn.`);

    await fetch('https://api.linkedin.com/v2/ugcPosts', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${post.access_token}`,
        'X-Restli-Protocol-Version': '2.0.0',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        author: 'urn:li:person:ME',
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

    await this.pool.query('UPDATE posts SET status = $1 WHERE id = $2', ['published', postId]);
  }
}
