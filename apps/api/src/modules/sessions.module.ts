import { Module } from '@nestjs/common';
import { SessionsController } from '../sessions/sessions.controller';
import { SessionsService } from '../sessions/sessions.service';

@Module({
  controllers: [SessionsController],
  providers: [SessionsService],
  exports: [SessionsService]
})
export class SessionsModule {}
