import { Controller, Get } from '@nestjs/common';
import { StatsService } from './stats.service';

const DEMO_USER_ID = 'demo-user';

@Controller('stats')
export class StatsController {
  constructor(private readonly statsService: StatsService) {}

  @Get('daily')
  daily() {
    return this.statsService.getDaily(DEMO_USER_ID);
  }

  @Get('weekly')
  weekly() {
    return this.statsService.getWeekly(DEMO_USER_ID);
  }
}
