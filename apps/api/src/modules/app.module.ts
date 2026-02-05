import { Module } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import { ThrottlerGuard, ThrottlerModule } from '@nestjs/throttler';
import { ScheduleModule } from '@nestjs/schedule';
import { ConfigModule } from '../shared/config.module';
import { DatabaseModule } from '../shared/database.module';
import { QueueModule } from './queue.module';
import { PostsModule } from './posts.module';
import { AiModule } from './ai.module';
import { AuthModule } from './auth.module';
import { SettingsModule } from './settings.module';

@Module({
  imports: [
    ConfigModule,
    DatabaseModule,
    QueueModule,
    PostsModule,
    AiModule,
    AuthModule,
    SettingsModule,
    ScheduleModule.forRoot(),
    ThrottlerModule.forRoot([
      {
        ttl: 60000,
        limit: 100
      }
    ])
  ],
  providers: [
    {
      provide: APP_GUARD,
      useClass: ThrottlerGuard
    }
  ]
})
export class AppModule {}
