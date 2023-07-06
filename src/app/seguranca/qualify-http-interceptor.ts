import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';

import { Injectable } from '@angular/core';

import { Observable, from } from 'rxjs';
import { mergeMap } from 'rxjs/operators';

import { AuthService } from './auth.service';

export class NotAuthenticatedError {}

@Injectable()
export class QualifyHttpInterceptor implements HttpInterceptor {

  constructor(private auth: AuthService) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    console.info("Token invalido: "+ this.auth.isAccessTokenInvalido())

    // if (! this.auth.isAccessTokenInvalido()){
    //   console.info("invalidando token")
    //   console.info("conteudo do localstorate:" + localStorage.getItem("refresh_token"))
    //   this.auth.limparAccessToken;

    // }

    console.info("Requisicao do interceptor : "+ req.url)


    if (!req.url.includes('/oauth2/token') && this.auth.isAccessTokenInvalido()) {
      console.info("Entrando no interceptor")
      console.info(req)
      return from(this.auth.obterNovoAccessToken())
        .pipe(
          mergeMap(() => {
            if (this.auth.isAccessTokenInvalido()) {
              throw new NotAuthenticatedError();
            }

            req = req.clone({
              setHeaders: {
                Authorization: `Bearer ${localStorage.getItem('token')}`
              }
            });

            return next.handle(req);
          })
        );
    }

    return next.handle(req);
  }
}
