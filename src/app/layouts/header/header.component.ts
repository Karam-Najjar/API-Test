import { Component } from '@angular/core';
import { AuthService } from '../../auth/services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
})
export class HeaderComponent {
  appId: string | null = this.authService.gettingId();

  constructor(private authService: AuthService) {}
}
