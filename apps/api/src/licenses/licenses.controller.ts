import { Body, Controller, Get, Post } from '@nestjs/common';
import { ActivateLicenseDto } from './licenses.dto';
import { LicensesService } from './licenses.service';

const DEMO_USER_ID = 'demo-user';

@Controller('licenses')
export class LicensesController {
  constructor(private readonly licensesService: LicensesService) {}

  @Post('activate')
  activate(@Body() body: ActivateLicenseDto) {
    return this.licensesService.activate(DEMO_USER_ID, body.licenseKey, body.deviceId);
  }

  @Get('me')
  me() {
    return this.licensesService.getMine(DEMO_USER_ID);
  }
}
