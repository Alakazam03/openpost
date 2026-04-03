import { Module } from '@nestjs/common';
import { SessionsModule } from './sessions.module';
import { StatsController } from '../stats/stats.controller';
import { StatsService } from '../stats/stats.service';

@Module({
  imports: [SessionsModule],
  controllers: [StatsController],
  providers: [StatsService]
})
export class StatsModule {}
