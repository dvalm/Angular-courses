// src/app/auth/token.interceptor.ts
import { Injectable, ComponentRef } from '@angular/core';
import {
    HttpRequest,
    HttpHandler,
    HttpEvent,
    HttpInterceptor,
    HttpErrorResponse
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { ModalService } from '../services/modal.service';
import { LoadingBlockComponent } from '../components/loading-block/loading-block.component';
import { tap, delay, catchError } from 'rxjs/operators';

@Injectable()
export class LoadingInterceptor implements HttpInterceptor {

    constructor(private modalService: ModalService) { }

    intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
        let i = Math.random();
        let modalRef: ComponentRef<LoadingBlockComponent>;
        if (!this.modalService.isOpen) {
            console.log(`aaa - ${i}`, request)
            //modalRef = this.modalService.openModal(LoadingBlockComponent);
        }
        console.log(next);
        return next.handle(request).pipe(
            /* tslint:disable */
            // 500 is 0.5s of fake delay
            delay(500),
            /* tslint:enable */

            tap(
                () => {
                    if (modalRef) {
                        console.log(`close - ${i}`)
                        //this.modalService.closeModel(modalRef);
                    }
                },
                (err) => {
                    //if (err instanceof HttpErrorResponse) {
                        console.log('sedgfdgf');
                    //}
                })
        );
    }
}
