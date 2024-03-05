import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { TranslatePipe } from '../shared/pipes/translation.pipe';

@Component({
  standalone: true,
  selector: 'app-summary',
  templateUrl: './summary.component.html',
  styleUrl: './summary.component.css',
  imports: [CommonModule, TranslatePipe],
})
export class SummaryComponent {
  @Input() formData!: FormGroup;
}