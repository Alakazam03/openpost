import { Inject, Injectable, Logger } from '@nestjs/common';
import { Pool } from 'pg';
import { QueueService } from '../queue/queue.service';
import { CreatePostDto, UpdatePostDto } from './posts.dto';

@Injectable()
export class PostsService {
  private readonly logger = new Logger(PostsService.name);

  constructor(
    @Inject('PG_POOL') private readonly pool: Pool,
    private readonly queueService: QueueService
  ) {}

  async createPost(userId: string, dto: CreatePostDto) {
    const status = dto.status ?? (dto.scheduledAt ? 'scheduled' : 'draft');
    const result = await this.pool.query(
      `INSERT INTO posts (user_id, content, status, scheduled_at, hashtags, media_urls, media_type)
       VALUES ($1, $2, $3, $4, $5, $6, $7)
       RETURNING *`,
      [
        userId,
        dto.content,
        status,
        dto.scheduledAt ? new Date(dto.scheduledAt) : null,
        dto.hashtags ?? [],
        dto.mediaUrls ?? [],
        dto.mediaType ?? null
      ]
    );

    const post = result.rows[0];
    if (post.scheduled_at) {
      await this.queueService.schedulePublish(post.id, post.scheduled_at.toISOString());
    }

    this.logger.log(`Created post ${post.id} for user ${userId}`);
    return post;
  }

  async listScheduled(userId: string) {
    const result = await this.pool.query(
      'SELECT * FROM posts WHERE user_id = $1 AND status = $2 ORDER BY scheduled_at ASC',
      [userId, 'scheduled']
    );
    return result.rows;
  }

  async updatePost(userId: string, postId: string, dto: UpdatePostDto) {
    const result = await this.pool.query(
      `UPDATE posts SET
        content = COALESCE($1, content),
        status = COALESCE($2, status),
        scheduled_at = $3,
        hashtags = COALESCE($4, hashtags),
        media_urls = COALESCE($5, media_urls),
        media_type = COALESCE($6, media_type)
       WHERE id = $7 AND user_id = $8
       RETURNING *`,
      [
        dto.content ?? null,
        dto.status ?? null,
        dto.scheduledAt ? new Date(dto.scheduledAt) : null,
        dto.hashtags ?? null,
        dto.mediaUrls ?? null,
        dto.mediaType ?? null,
        postId,
        userId
      ]
    );

    const post = result.rows[0];
    if (post?.scheduled_at) {
      await this.queueService.schedulePublish(post.id, post.scheduled_at.toISOString());
    }
    return post;
  }

  async deletePost(userId: string, postId: string) {
    await this.pool.query('DELETE FROM posts WHERE id = $1 AND user_id = $2', [postId, userId]);
    this.logger.log(`Deleted post ${postId}`);
    return { success: true };
  }
}
