import { Directive, Input, TemplateRef, ViewContainerRef } from '@angular/core';
 
@Directive({ 
    selector: '[hourglass]'
})
export class HourglassDirective {
     
    constructor(private templateRef: TemplateRef<any>, 
                private viewContainer: ViewContainerRef) { }  

    @Input() set hourglass(duration: number) {
        if (duration >= 90) {
          this.viewContainer.createEmbeddedView(this.templateRef);
        } else {
          this.viewContainer.clear();
        }
    }
}