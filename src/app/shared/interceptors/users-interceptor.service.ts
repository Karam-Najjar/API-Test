import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';

import { AuthService } from '../../auth/services/auth.service';

@Injectable()
export class UsersInterceptor implements HttpInterceptor {
  constructor(private authService: AuthService) {}
  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    const appId = this.authService.gettingId();
    const reqWithAppId = req.clone({
      setHeaders: {
        'app-id': appId || '',
      },
    });

    return next.handle(reqWithAppId);
  }
}
