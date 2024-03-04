import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ErrorAlertService {
  constructor() {}

  showErrorAlert(errorMessage: string): void {
    alert(errorMessage);
  }
}
