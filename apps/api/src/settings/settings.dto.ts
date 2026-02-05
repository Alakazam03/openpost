import { IsString } from 'class-validator';

export class UpdateSettingsDto {
  @IsString()
  timezone: string;

  @IsString()
  defaultPostTime: string;
}
