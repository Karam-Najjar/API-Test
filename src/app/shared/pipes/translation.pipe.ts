import { Pipe, PipeTransform } from '@angular/core';

import translations from '../../../assets/i18n/translation.json';

interface Translation {
  [key: string]: string;
}

@Pipe({
  standalone: true,
  name: 'translate',
})
export class TranslatePipe implements PipeTransform {
  transform(value: string): string {
    const translation: Translation = translations;
    return translation[value] || value;
  }
}
