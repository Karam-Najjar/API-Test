import { Injectable } from '@angular/core';

import { CustomValidators } from './custom-validators';

@Injectable({ providedIn: 'root' })
export class ValidatorService {
  private customValidator = CustomValidators;

  getValidationErrorMessage(control: any): string {
    if (control?.hasError('required')) {
      return this.customValidator.required;
    }

    if (control?.hasError('minlength')) {
      return this.customValidator.minLength;
    }

    if (control?.hasError('maxlength')) {
      return this.customValidator.maxLength;
    }
    if (control?.hasError('email')) {
      return this.customValidator.email;
    }

    return '';
  }
}
