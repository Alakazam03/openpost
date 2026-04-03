import { Module } from '@nestjs/common';
import { PostureController } from '../posture/posture.controller';
import { PostureService } from '../posture/posture.service';

@Module({
  controllers: [PostureController],
  providers: [PostureService]
})
export class PostureModule {}
