import { IsNumber, IsOptional, Max, Min } from 'class-validator';

export class ScorePostureDto {
  @IsNumber()
  @Min(0)
  @Max(90)
  headForwardAngle!: number;

  @IsNumber()
  @Min(0)
  @Max(45)
  shoulderAsymmetry!: number;

  @IsNumber()
  @Min(0)
  @Max(60)
  torsoLean!: number;

  @IsOptional()
  @IsNumber()
  @Min(0)
  @Max(1)
  confidence?: number;

  @IsOptional()
  @IsNumber()
  @Min(0)
  @Max(100)
  baselineScore?: number;
}
