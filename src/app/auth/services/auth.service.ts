import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class AuthService {
  storingId(appId: string) {
    localStorage.setItem('app-id', appId);
  }
  gettingId() {
    const storedData = localStorage.getItem('app-id');
    return storedData ? storedData.trim().replace(/^"|"$/g, '') : null;
  }
}
