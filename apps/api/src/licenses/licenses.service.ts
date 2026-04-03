import { Injectable } from '@nestjs/common';

type LicenseState = {
  userId: string;
  licenseKey: string;
  deviceId: string;
  activatedAt: string;
  valid: boolean;
};

@Injectable()
export class LicensesService {
  private readonly licenses = new Map<string, LicenseState>();

  activate(userId: string, licenseKey: string, deviceId: string): LicenseState {
    const state: LicenseState = {
      userId,
      licenseKey,
      deviceId,
      activatedAt: new Date().toISOString(),
      valid: true
    };

    this.licenses.set(userId, state);
    return state;
  }

  getMine(userId: string): LicenseState | null {
    return this.licenses.get(userId) ?? null;
  }
}
