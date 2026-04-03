import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { EndSessionDto, SessionHeartbeatDto, StartSessionDto } from './sessions.dto';
import { SessionsService } from './sessions.service';

const DEMO_USER_ID = 'demo-user';

@Controller('sessions')
export class SessionsController {
  constructor(private readonly sessionsService: SessionsService) {}

  @Post('start')
  start(@Body() body: StartSessionDto) {
    return this.sessionsService.start(DEMO_USER_ID, body.deviceId);
  }

  @Post(':id/heartbeat')
  heartbeat(@Param('id') id: string, @Body() body: SessionHeartbeatDto) {
    return this.sessionsService.heartbeat(id, body.score, body.capturedAt);
  }

  @Post(':id/end')
  end(@Param('id') id: string, @Body() body: EndSessionDto) {
    return this.sessionsService.end(id, body.endedAt);
  }

  @Get()
  listMine() {
    return this.sessionsService.listByUser(DEMO_USER_ID);
  }
}
