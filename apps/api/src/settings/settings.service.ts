import { Inject, Injectable } from '@nestjs/common';
import { Pool } from 'pg';
import { UpdateSettingsDto } from './settings.dto';

@Injectable()
export class SettingsService {
  constructor(@Inject('PG_POOL') private readonly pool: Pool) {}

  async getSettings(userId: string) {
    const result = await this.pool.query('SELECT * FROM settings WHERE user_id = $1', [userId]);
    return result.rows[0] ?? null;
  }

  async updateSettings(userId: string, dto: UpdateSettingsDto) {
    const result = await this.pool.query(
      `INSERT INTO settings (user_id, timezone, default_post_time)
       VALUES ($1, $2, $3)
       ON CONFLICT (user_id)
       DO UPDATE SET timezone = $2, default_post_time = $3
       RETURNING *`,
      [userId, dto.timezone, dto.defaultPostTime]
    );

    return result.rows[0];
  }
}
