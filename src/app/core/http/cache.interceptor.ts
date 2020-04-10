import { Injectable } from '@angular/core';
import { HttpEvent, HttpRequest, HttpResponse, HttpInterceptor, HttpHandler, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { startWith, tap } from 'rxjs/operators';
import 'rxjs/add/observable/of';

import { LoggerService } from '@asx/core/logger/logger.service';
import { CacheService } from '@asx/core/http/cache.service';

@Injectable()
export class CacheInterceptor implements HttpInterceptor {

constructor(private cache: CacheService, private logger: LoggerService) {}

  intercept(req: HttpRequest<any>, next: HttpHandler) {
    const cachedResponse = this.cache.get(req);
    this.logger.info("request to be cached in interceptor :" + req);
    return cachedResponse ? Observable.of(cachedResponse) : this.sendRequest(req, next, this.cache);
  }

  sendRequest(
    req: HttpRequest<any>,
    next: HttpHandler,
    cache: CacheService): Observable<HttpEvent<any>> {
    const noHeaderReq = req.clone({headers : new HttpHeaders()});
    return next.handle(noHeaderReq).pipe(
      tap(event => {
        if (event instanceof HttpResponse) {
          this.logger.info("request cached from sendRequest :" + req);
          cache.put(req, event);
        }
      })
    );
  }

}
