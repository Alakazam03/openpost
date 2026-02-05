import { Controller, Get, Headers, Query, Res } from '@nestjs/common';
import { Response } from 'express';
import { AuthService } from './auth.service';

@Controller('auth/linkedin')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Get('redirect')
  redirectToLinkedIn(@Res() res: Response) {
    const url = this.authService.getLinkedInAuthUrl();
    res.redirect(url);
  }

  @Get('callback')
  async handleCallback(@Query('code') code: string, @Res() res: Response) {
    const token = await this.authService.exchangeCode(code);
    const profile = await this.authService.fetchProfile(token.access_token);
    const user = await this.authService.upsertUser(profile.id, token.access_token, token.expires_in);

    res.redirect(`${process.env.APP_BASE_URL ?? 'http://localhost:3000'}/settings?user=${user.id}`);
  }

  @Get('disconnect')
  disconnect(@Headers('x-user-id') userId: string) {
    return this.authService.disconnect(userId);
  }
}
