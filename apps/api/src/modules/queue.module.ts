import { Module } from '@nestjs/common';
import { QueueService } from '../queue/queue.service';
import { QueueWorker } from '../queue/queue.worker';

@Module({
  providers: [QueueService, QueueWorker],
  exports: [QueueService]
})
export class QueueModule {}
