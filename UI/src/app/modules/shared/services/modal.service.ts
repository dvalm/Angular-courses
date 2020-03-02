import {Injectable, ApplicationRef, Injector, ComponentFactoryResolver, ComponentRef, EmbeddedViewRef} from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class ModalService {

    private _isOpen = false;
    public get isOpen(): boolean {
        return this._isOpen;
    }

    constructor(private appRef: ApplicationRef,
                private injector: Injector,
                private resolver: ComponentFactoryResolver) {}
 /* tslint:disable */
    public openModal(modalInstance: any): ComponentRef<any> {
        this._isOpen = true;
        return this.attachComponentToBody(modalInstance);
    }

    public closeModel(componentRef: ComponentRef<any>): void {
        this._isOpen = false;
        this.removeComponentFromBody(componentRef);
    }

    private attachComponentToBody(component: any): ComponentRef<any> {
        const componentRef = this.resolver
            .resolveComponentFactory(component)
            .create(this.injector);
        const domElement = (componentRef.hostView as EmbeddedViewRef<any>)
            .rootNodes[0] as HTMLElement;
        this.appRef.attachView(componentRef.hostView);
        document.body.appendChild(domElement);
        return componentRef;
    }

    private removeComponentFromBody(componentRef: ComponentRef<any>): void {
/* tslint:enable */
        this.appRef.detachView(componentRef.hostView);
        componentRef.destroy();
    }
}
