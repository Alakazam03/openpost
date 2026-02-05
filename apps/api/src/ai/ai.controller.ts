import { Body, Controller, Post } from '@nestjs/common';
import { AiService } from './ai.service';
import { AiGenerateDto } from './ai.dto';

@Controller('ai')
export class AiController {
  constructor(private readonly aiService: AiService) {}

  @Post('generate')
  generate(@Body() dto: AiGenerateDto) {
    return this.aiService.generate(dto);
  }
}
