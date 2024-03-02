import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ErrorAlert {
  constructor() {}

  showErrorAlert(errorMessage: string): void {
    alert(errorMessage);
  }
}
