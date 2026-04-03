import { Injectable } from '@nestjs/common';
import { SessionsService } from '../sessions/sessions.service';

@Injectable()
export class StatsService {
  constructor(private readonly sessionsService: SessionsService) {}

  getDaily(userId: string) {
    const sessions = this.sessionsService.listByUser(userId);
    const allScores = sessions.flatMap((session) => session.heartbeats.map((beat) => beat.score));

    const avgScore =
      allScores.length === 0
        ? 0
        : allScores.reduce((sum, score) => sum + score, 0) / allScores.length;

    return {
      date: new Date().toISOString().slice(0, 10),
      sessions: sessions.length,
      avgScore: Number(avgScore.toFixed(1)),
      goodMinutes: allScores.filter((score) => score >= 70).length,
      slouchMinutes: allScores.filter((score) => score < 70).length
    };
  }

  getWeekly(userId: string) {
    const today = this.getDaily(userId);
    return {
      weekWindowDays: 7,
      trend: [today]
    };
  }
}
