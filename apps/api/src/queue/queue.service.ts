import { Inject, Injectable, Logger } from '@nestjs/common';
import { Queue } from 'bullmq';
import { RedisOptions } from 'ioredis';

@Injectable()
export class QueueService {
  private readonly logger = new Logger(QueueService.name);
  private readonly queue: Queue;

  constructor(@Inject('CONFIG') private readonly config: Record<string, string | undefined>) {
    const connection: RedisOptions = {
      maxRetriesPerRequest: null,
      enableReadyCheck: false
    };

    this.queue = new Queue('post-scheduler', {
      connection: {
        ...connection,
        ...(this.config.redisUrl ? { url: this.config.redisUrl } : {})
      },
      defaultJobOptions: {
        attempts: 5,
        backoff: {
          type: 'exponential',
          delay: 5000
        },
        removeOnComplete: true,
        removeOnFail: 100
      }
    });
  }

  async schedulePublish(postId: string, scheduledAt: string) {
    const delay = new Date(scheduledAt).getTime() - Date.now();
    if (delay <= 0) {
      await this.queue.add('publish', { postId });
      this.logger.log(`Queued immediate publish for ${postId}`);
      return;
    }

    await this.queue.add('publish', { postId }, { delay });
    this.logger.log(`Scheduled publish for ${postId} in ${delay}ms`);
  }
}
