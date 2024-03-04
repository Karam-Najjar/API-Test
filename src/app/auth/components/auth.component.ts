import { Component, ViewChild } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { AuthService } from '../services/auth.service';

@Component({
  standalone: true,
  imports: [FormsModule],
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrl: './auth.component.css',
})
export class AuthComponent {
  @ViewChild('f') authForm!: NgForm;

  constructor(private authService: AuthService) {}

  onSubmit() {
    let appId = this.authForm.form.value.id;

    this.authService.storingId(appId);
  }
}
