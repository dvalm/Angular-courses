import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
    selector: 'app-course',
    templateUrl: './course.component.html',
    styleUrls: ['./course.component.scss']
  })
  export class CourseComponent{
    
    @Input() course: any;
    @Output() onDelete:  EventEmitter<any> = new EventEmitter();

    public delete(): void{
      this.onDelete.emit();
    }
  
  }