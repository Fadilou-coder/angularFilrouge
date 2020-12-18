import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';
import { TokenService } from 'src/app/Services/token.service';

@Injectable({
  providedIn: 'root'
})
export class LoginInterceptor implements HttpInterceptor{
  constructor(public tokenService: TokenService) { }
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const token = this.tokenService.getLocalStorageToken();
    if ( token ) {
      const cloneReq = req.clone(
        {
          headers: req.headers.set('Authorization', `Bearer ${token.token}`)
        }
      );
      return next.handle(cloneReq);
    }else {
      return next.handle(req);
    }
  }
}
