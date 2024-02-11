import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpResponse
} from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { CacheService } from '../services/cache.service';

@Injectable()
export class CacheInterceptor implements HttpInterceptor {

  constructor(private cacheService: CacheService) {}

   intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    // Check if the request is cacheable
    if (request.method !== 'GET') {
      return next.handle(request);
    }

    const cachedResponse = this.cacheService.get(request.url);

    if (cachedResponse) {
      // If cached response exists, return it as Observable
      return new Observable(observer => {
        observer.next(cachedResponse);
        observer.complete();
      });
    } else {
      // If no cached response, continue with the original request
      return next.handle(request).pipe(
        tap(event => {
          // Cache the response for future use
          if (event instanceof HttpResponse) {
            this.cacheService.set(request.url, event);
          }
        })
      );
    }
  }
}
