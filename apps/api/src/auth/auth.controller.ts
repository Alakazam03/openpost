import { Controller, Delete, Get, Headers, Query, Res } from '@nestjs/common';
import { Response } from 'express';
import { randomUUID } from 'crypto';
import { AuthService } from './auth.service';

@Controller('auth/linkedin')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Get('redirect')
  redirectToLinkedIn(@Res() res: Response) {
    const state = randomUUID();
    const url = this.authService.getLinkedInAuthUrl(state);
    res.cookie('linkedin_oauth_state', state, {
      httpOnly: true,
      sameSite: 'lax',
      secure: process.env.NODE_ENV === 'production'
    });
    res.redirect(url);
  }

  @Get('callback')
  async handleCallback(
    @Query('code') code: string,
    @Query('state') state: string,
    @Res() res: Response
  ) {
    if (!code || !state || state !== res.req.cookies?.linkedin_oauth_state) {
      return res.redirect(`${process.env.APP_BASE_URL ?? 'http://localhost:3000'}/onboarding?error=oauth_state`);
    }

    const token = await this.authService.exchangeCode(code);
    const profile = await this.authService.fetchProfile(token.access_token);
    const user = await this.authService.upsertUser(profile.id, token.access_token, token.expires_in);

    res.clearCookie('linkedin_oauth_state');
    res.redirect(`${process.env.APP_BASE_URL ?? 'http://localhost:3000'}/settings?user=${user.id}`);
  }

  @Delete('disconnect')
  disconnect(@Headers('x-user-id') userId: string) {
    return this.authService.disconnect(userId);
  }
}
