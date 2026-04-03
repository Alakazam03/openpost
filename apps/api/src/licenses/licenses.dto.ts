import { IsString, Length } from 'class-validator';

export class ActivateLicenseDto {
  @IsString()
  @Length(8, 128)
  licenseKey!: string;

  @IsString()
  deviceId!: string;
}
