import {Directive, ElementRef, Input, OnInit} from '@angular/core';

@Directive({
    selector: '[appCoursePlateBorder]'
})
export class CoursePlateBorderDirective implements OnInit{
    
    @Input() courseDate: Date;
    private currentDate: Date;
    private green: string = "#d9e46a";
    private blue: string = "#98e1ea";
     
    constructor(private elementRef: ElementRef){
        this.currentDate = new Date();
    }

    public ngOnInit(): void {
       this.createCourseBorder();
    }

    private createCourseBorder(): void{
        if(this.courseDate < this.currentDate && (+this.courseDate >= (+this.currentDate - 1000*60*60*24*14))){
            this.elementRef.nativeElement.style.borderLeft = "3px solid "+this.green;
            this.elementRef.nativeElement.style.paddingLeft = "7px"; 
        }else if(this.currentDate < this.courseDate){
            this.elementRef.nativeElement.style.borderLeft = "3px solid " +this.blue;
            this.elementRef.nativeElement.style.paddingLeft = "7px"; 
        }
    }
}