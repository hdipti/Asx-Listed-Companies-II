import { Injectable } from '@angular/core';
import {
  HttpEvent, HttpHeaders, HttpRequest, HttpResponse,
  HttpInterceptor, HttpHandler
} from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { LoggerService } from '@asx/service/logger.service';

@Injectable({
  providedIn: 'root'
})
export class CacheService implements HttpInterceptor {

  cache = new Map<string, RequestCacheEntry>();

  constructor(private logger: LoggerService) { }

  // add intercept method
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
   /* return next.handle(request).pipe(catchError(err => {
        if (err.status === 401) {
            // auto logout if 401 response returned from api
           // this.authenticationService.logout();
           // location.reload(true);
        }

        const error = err.error.message || err.statusText;
        return throwError(error);
    })) */

    return next.handle(request);
  }

   get(req: HttpRequest<any>): HttpResponse<any> | undefined {
    const url = req.urlWithParams;
    const cached = this.cache.get(url);

    if (!cached) {
      return undefined;
    }

    //const isExpired = cached.lastRead < (Date.now() - maxAge);
    //const expired = isExpired ? 'expired ' : '';
    const isValid = (cached.sessionId === 1) ? true : false;
    // logger
  }

  put(req: HttpRequest<any>, response: HttpResponse<any>): void {
    const url = req.urlWithParams;
    // logger
                    // sessionId: 1
    const entry = { url, response, sessionId: 1 };
    this.cache.set(url, entry);

  /* change logic
    // remove expired cache entries
    const expired = Date.now() - maxAge;
    this.cache.forEach(entry => {
      if (entry.lastRead < expired) {
        this.cache.delete(entry.url);
      }
    });
  */
    // logger
  }

}

 export interface RequestCacheEntry {
  url: string;
  response: HttpResponse<any>;
  sessionId: number;
}