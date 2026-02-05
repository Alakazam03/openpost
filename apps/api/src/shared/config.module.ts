import { Global, Module } from '@nestjs/common';
import * as dotenv from 'dotenv';

@Global()
@Module({
  providers: [
    {
      provide: 'CONFIG',
      useFactory: () => {
        dotenv.config();
        return {
          port: process.env.PORT ?? '4000',
          databaseUrl: process.env.DATABASE_URL,
          redisUrl: process.env.REDIS_URL,
          openaiApiKey: process.env.OPENAI_API_KEY,
          linkedinClientId: process.env.LINKEDIN_CLIENT_ID,
          linkedinClientSecret: process.env.LINKEDIN_CLIENT_SECRET,
          linkedinRedirectUri: process.env.LINKEDIN_REDIRECT_URI,
          appBaseUrl: process.env.APP_BASE_URL ?? 'http://localhost:3000'
        };
      }
    }
  ],
  exports: ['CONFIG']
})
export class ConfigModule {}
