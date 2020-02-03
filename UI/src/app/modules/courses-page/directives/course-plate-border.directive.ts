import {Directive, ElementRef, Input, OnInit} from '@angular/core';

@Directive({
    selector: '[appCoursePlateBorder]'
})
export class CoursePlateBorderDirective implements OnInit {

    @Input('appCoursePlateBorder') courseDate: Date;
    private currentDate: Date;
    private green = '#d9e46a';
    private blue = '#98e1ea';
    private day = 1000 * 60 * 60 * 24;
    private hostHTMLElemenStyle: any = this.elementRef.nativeElement.style;

    constructor(private elementRef: ElementRef) {
        this.currentDate = new Date();
    }

    public ngOnInit(): void {
       this.createCourseBorder();
    }

    private createCourseBorder(): void {
        if (this.courseDate < this.currentDate && (this.courseDate.getTime() >= (this.currentDate.getTime() - this.day * 14) )) {
            this.hostHTMLElemenStyle.borderLeft = `3px solid ${this.green}`;
            this.hostHTMLElemenStyle.paddingLeft = '7px';
        } else if (this.currentDate < this.courseDate) {
            console.log(typeof this.elementRef.nativeElement.style);
            this.hostHTMLElemenStyle.borderLeft = `3px solid ${this.blue}`;
            this.hostHTMLElemenStyle.paddingLeft = '7px';
        }
    }
}
