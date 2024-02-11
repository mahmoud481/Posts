import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpResponse
} from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { CommonService } from '../services/common.service';

@Injectable()
export class HttpRequestInterceptor implements HttpInterceptor {

  constructor(private common: CommonService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    if(!request.url.includes('comments')){
      this.common.loading.next(true)
    }
    return next.handle(request).pipe(
      map((event: HttpEvent<any>) => {
        if (event instanceof HttpResponse) {
           this.common.loading.next(false)
        }
        return event;
      })
    );
  }
}
