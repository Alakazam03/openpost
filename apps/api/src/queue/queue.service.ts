import { Inject, Injectable, Logger, OnModuleDestroy } from '@nestjs/common';
import { Queue } from 'bullmq';
import IORedis from 'ioredis';

@Injectable()
export class QueueService implements OnModuleDestroy {
  private readonly logger = new Logger(QueueService.name);
  private readonly connection: IORedis;
  private readonly queue: Queue;

  constructor(@Inject('CONFIG') private readonly config: Record<string, string | undefined>) {
    this.connection = new IORedis(this.config.redisUrl ?? 'redis://localhost:6379', {
      maxRetriesPerRequest: null
    });

    this.queue = new Queue('post-scheduler', {
      connection: this.connection,
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

  async onModuleDestroy() {
    await this.queue.close();
    await this.connection.quit();
  }
}
