// src/app/auth/token.interceptor.ts
import { Injectable, ComponentRef } from '@angular/core';
import {
    HttpRequest,
    HttpHandler,
    HttpEvent,
    HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { ModalService } from '../services/modal.service';
import { LoadingBlockComponent } from '../components/loading-block/loading-block.component';
import { tap, delay } from 'rxjs/operators';

@Injectable()
export class LoadingInterceptor implements HttpInterceptor {

    constructor(private modalService: ModalService) { }

    intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
        let modalRef: ComponentRef<LoadingBlockComponent>;
        if (!this.modalService.isOpen) {
            modalRef = this.modalService.openModal(LoadingBlockComponent);
        }
        return next.handle(request).pipe(
/* tslint:disable */
// 500 is 0.5s of fake delay
            delay(1000),
/* tslint:enable */
            tap(() => {
                    if (modalRef) {
                        this.modalService.closeModel(modalRef);
                    }
                }
            )
        );
    }
}
