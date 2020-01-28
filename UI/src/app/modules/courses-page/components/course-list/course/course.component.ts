import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Course } from 'src/app/modules/courses-page/models/course';

@Component({
    selector: 'app-course',
    templateUrl: './course.component.html',
    styleUrls: ['./course.component.scss']
  })
  export class CourseComponent{
    
    @Input() course: any;
    @Output() onDelete:  EventEmitter<Course> = new EventEmitter<Course>();

    public delete(): void{
      this.onDelete.emit(this.course);
    }
  
  }