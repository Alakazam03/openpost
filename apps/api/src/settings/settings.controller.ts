import { Body, Controller, Get, Headers, Put } from '@nestjs/common';
import { SettingsService } from './settings.service';
import { UpdateSettingsDto } from './settings.dto';

@Controller('settings')
export class SettingsController {
  constructor(private readonly settingsService: SettingsService) {}

  @Get()
  getSettings(@Headers('x-user-id') userId: string) {
    return this.settingsService.getSettings(userId);
  }

  @Put()
  updateSettings(@Headers('x-user-id') userId: string, @Body() dto: UpdateSettingsDto) {
    return this.settingsService.updateSettings(userId, dto);
  }
}
