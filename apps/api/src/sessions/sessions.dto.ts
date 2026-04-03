import { IsNumber, IsOptional, IsString, Max, Min } from 'class-validator';

export class StartSessionDto {
  @IsString()
  deviceId!: string;
}

export class SessionHeartbeatDto {
  @IsNumber()
  @Min(0)
  @Max(100)
  score!: number;

  @IsOptional()
  @IsString()
  capturedAt?: string;
}

export class EndSessionDto {
  @IsOptional()
  @IsString()
  endedAt?: string;
}
