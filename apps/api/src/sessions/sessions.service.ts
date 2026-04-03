import { Injectable, NotFoundException } from '@nestjs/common';
import { randomUUID } from 'crypto';

type SessionState = {
  id: string;
  userId: string;
  deviceId: string;
  startedAt: string;
  endedAt: string | null;
  heartbeats: Array<{ score: number; capturedAt: string }>;
};

@Injectable()
export class SessionsService {
  private readonly sessions = new Map<string, SessionState>();

  start(userId: string, deviceId: string): SessionState {
    const id = randomUUID();
    const session: SessionState = {
      id,
      userId,
      deviceId,
      startedAt: new Date().toISOString(),
      endedAt: null,
      heartbeats: []
    };
    this.sessions.set(id, session);
    return session;
  }

  heartbeat(sessionId: string, score: number, capturedAt?: string) {
    const session = this.sessions.get(sessionId);
    if (!session) {
      throw new NotFoundException('Session not found');
    }

    session.heartbeats.push({
      score,
      capturedAt: capturedAt ?? new Date().toISOString()
    });

    const count = session.heartbeats.length;
    const avgScore =
      count === 0
        ? 0
        : session.heartbeats.reduce((sum, item) => sum + item.score, 0) / count;

    return {
      sessionId,
      sampleCount: count,
      avgScore: Number(avgScore.toFixed(1))
    };
  }

  end(sessionId: string, endedAt?: string) {
    const session = this.sessions.get(sessionId);
    if (!session) {
      throw new NotFoundException('Session not found');
    }

    session.endedAt = endedAt ?? new Date().toISOString();
    return session;
  }

  listByUser(userId: string): SessionState[] {
    return [...this.sessions.values()].filter((session) => session.userId === userId);
  }
}
