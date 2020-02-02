import {Injectable, ApplicationRef, Injector, ComponentFactoryResolver, ComponentRef, EmbeddedViewRef} from '@angular/core';
import { DeleteCourseModalDialogComponent } from '../components/delete-course-modal-dialog/delete-course-modal-dialog.component';
import { Course } from '../../courses-page/models/course';
import { CoursesService } from '../../courses-page/services/courses.service';
import { CourseListComponent } from '../../courses-page/components/course-list/course-list.component';

@Injectable({
    providedIn: 'root'
})
export class ModalService {

    constructor(private appRef: ApplicationRef,
                private injector: Injector,
                private resolver: ComponentFactoryResolver) {}

    public openModal(modalInstance: any): ComponentRef<any> {
        return this.attachComponentToBody(modalInstance);
    }

    public closeModel(componentRef: ComponentRef<any>): void {
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
        this.appRef.detachView(componentRef.hostView);
        componentRef.destroy();
    }
}
