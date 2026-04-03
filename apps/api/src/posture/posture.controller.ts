import { Body, Controller, Post } from '@nestjs/common';
import { ScorePostureDto } from './posture.dto';
import { PostureService } from './posture.service';

@Controller('posture')
export class PostureController {
  constructor(private readonly postureService: PostureService) {}

  @Post('score/v1')
  scoreV1(@Body() body: ScorePostureDto) {
    return this.postureService.scoreV1(body);
  }

  @Post('score/v2')
  scoreV2(@Body() body: ScorePostureDto) {
    return this.postureService.scoreV2(body);
  }
}
