import { Injectable } from '@nestjs/common';
import { ScorePostureDto } from './posture.dto';

@Injectable()
export class PostureService {
  scoreV1(input: ScorePostureDto) {
    const rawPenalty = input.headForwardAngle * 1.1 + input.shoulderAsymmetry * 0.9 + input.torsoLean * 1.2;
    const score = Math.max(0, Math.min(100, 100 - rawPenalty));
    return {
      version: 'v1',
      score: Number(score.toFixed(1)),
      band: this.band(score)
    };
  }

  scoreV2(input: ScorePostureDto) {
    const confidence = input.confidence ?? 1;
    const baseline = input.baselineScore ?? 82;

    const normalizedPenalty =
      input.headForwardAngle * 0.9 + input.shoulderAsymmetry * 0.7 + input.torsoLean * 1.1;

    const confidenceBoost = confidence < 0.65 ? 6 : 0;
    const baselineAdjustment = Math.max(-8, Math.min(8, (baseline - 82) * 0.25));

    const score = Math.max(
      0,
      Math.min(100, baseline + baselineAdjustment - normalizedPenalty - confidenceBoost)
    );

    return {
      version: 'v2',
      score: Number(score.toFixed(1)),
      band: this.band(score),
      meta: {
        baseline,
        confidence,
        confidenceBoost
      }
    };
  }

  private band(score: number): 'good' | 'warning' | 'slouch' {
    if (score >= 75) return 'good';
    if (score >= 60) return 'warning';
    return 'slouch';
  }
}
