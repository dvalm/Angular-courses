import { Directive, Input, TemplateRef, ViewContainerRef } from '@angular/core';

@Directive({
    selector: '[hourglass]'
})
export class HourglassDirective {

    @Input('hourglass') maxDuration = 90;

    constructor(private templateRef: TemplateRef<any>,
                private viewContainer: ViewContainerRef) {}

    @Input() set hourglass(duration: number) {
        if (duration >= this.maxDuration) {
          this.viewContainer.createEmbeddedView(this.templateRef);
        }
    }
}
