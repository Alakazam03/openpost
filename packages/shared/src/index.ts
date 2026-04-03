export type PostureBand = 'good' | 'warning' | 'slouch';

export interface SessionHeartbeat {
  score: number;
  capturedAt: string;
}

export interface PostureSession {
  id: string;
  userId: string;
  deviceId: string;
  startedAt: string;
  endedAt: string | null;
  heartbeats: SessionHeartbeat[];
}

export interface DailyPostureStats {
  date: string;
  sessions: number;
  avgScore: number;
  goodMinutes: number;
  slouchMinutes: number;
}

export interface LicenseState {
  userId: string;
  licenseKey: string;
  deviceId: string;
  activatedAt: string;
  valid: boolean;
}


export interface PostureScoreInput {
  headForwardAngle: number;
  shoulderAsymmetry: number;
  torsoLean: number;
  confidence?: number;
  baselineScore?: number;
}

export interface PostureScoreResult {
  version: 'v1' | 'v2';
  score: number;
  band: PostureBand;
}
