import { PostureService } from './posture.service';

function assert(condition: boolean, message: string) {
  if (!condition) {
    throw new Error(message);
  }
}

function main() {
  const service = new PostureService();

  const sample = {
    headForwardAngle: 14,
    shoulderAsymmetry: 5,
    torsoLean: 8,
    confidence: 0.91,
    baselineScore: 84
  };

  const v1 = service.scoreV1(sample);
  const v2 = service.scoreV2(sample);

  assert(v1.score >= 0 && v1.score <= 100, 'v1 score out of range');
  assert(v2.score >= 0 && v2.score <= 100, 'v2 score out of range');
  assert(v2.score !== v1.score, 'v1 and v2 should differ for comparison testing');

  const lowConfidence = service.scoreV2({
    ...sample,
    confidence: 0.4
  });

  assert(lowConfidence.score < v2.score, 'v2 should penalize low confidence input');

  console.log('posture harness passed', { v1, v2, lowConfidence });
}

main();
