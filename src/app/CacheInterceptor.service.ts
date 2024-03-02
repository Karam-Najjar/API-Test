import { Injectable } from '@angular/core';
import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpResponse,
} from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable()
export class CacheInterceptor implements HttpInterceptor {
  private cache = new Map<string, HttpResponse<any>>();

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    // Check if request method is GET
    if (request.method !== 'GET') {
      // Do not cache non-GET requests
      return next.handle(request);
    }

    // Check if response is cached
    const cachedResponse = this.cache.get(request.url);
    if (cachedResponse) {
      // Return cached response
      return of(cachedResponse);
    }

    // Forward request to next handler and cache response
    return next.handle(request).pipe(
      tap((event) => {
        if (event instanceof HttpResponse) {
          this.cache.set(request.url, event);
        }
      })
    );
  }
}
