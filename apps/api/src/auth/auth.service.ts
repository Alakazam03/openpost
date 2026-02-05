import { Inject, Injectable } from '@nestjs/common';
import fetch from 'node-fetch';
import { Pool } from 'pg';

@Injectable()
export class AuthService {
  constructor(
    @Inject('CONFIG') private readonly config: Record<string, string | undefined>,
    @Inject('PG_POOL') private readonly pool: Pool
  ) {}

  getLinkedInAuthUrl() {
    const params = new URLSearchParams({
      response_type: 'code',
      client_id: this.config.linkedinClientId ?? '',
      redirect_uri: this.config.linkedinRedirectUri ?? '',
      scope: 'r_liteprofile r_emailaddress w_member_social'
    });

    return `https://www.linkedin.com/oauth/v2/authorization?${params.toString()}`;
  }

  async exchangeCode(code: string) {
    const response = await fetch('https://www.linkedin.com/oauth/v2/accessToken', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: new URLSearchParams({
        grant_type: 'authorization_code',
        code,
        redirect_uri: this.config.linkedinRedirectUri ?? '',
        client_id: this.config.linkedinClientId ?? '',
        client_secret: this.config.linkedinClientSecret ?? ''
      })
    });

    return (await response.json()) as { access_token: string; expires_in: number };
  }

  async fetchProfile(accessToken: string) {
    const response = await fetch('https://api.linkedin.com/v2/me', {
      headers: { Authorization: `Bearer ${accessToken}` }
    });
    return (await response.json()) as { id: string };
  }

  async upsertUser(linkedinId: string, accessToken: string, expiresIn: number) {
    const expiresAt = new Date(Date.now() + expiresIn * 1000);
    const result = await this.pool.query(
      `INSERT INTO users (linkedin_id, access_token, expires_at)
       VALUES ($1, $2, $3)
       ON CONFLICT (linkedin_id) DO UPDATE SET access_token = $2, expires_at = $3
       RETURNING *`,
      [linkedinId, accessToken, expiresAt]
    );

    return result.rows[0];
  }

  async disconnect(userId: string) {
    await this.pool.query('UPDATE users SET access_token = NULL WHERE id = $1', [userId]);
    return { success: true };
  }
}
