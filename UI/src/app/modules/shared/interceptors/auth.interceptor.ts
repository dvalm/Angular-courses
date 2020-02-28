// src/app/auth/token.interceptor.ts
import { Injectable } from '@angular/core';
import {
    HttpRequest,
    HttpHandler,
    HttpEvent,
    HttpInterceptor
} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

    private _userInfoURL = 'http://localhost:3004/auth/userInfo';

    constructor() {}

    intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {

        if (request.url === this._userInfoURL) {
            request = request.clone({
                setHeaders: {
                    Authorization: 'testToken'
                }
            });
        }
        return next.handle(request);
    }
}
