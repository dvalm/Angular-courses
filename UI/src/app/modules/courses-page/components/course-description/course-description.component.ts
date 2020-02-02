import { Component, Output, EventEmitter } from '@angular/core';

@Component({
    selector: 'app-course-description',
    templateUrl: './course-description.component.html',
    styleUrls: ['./course-description.component.scss'],
  })
  export class CoursesDescriptionComponent {

    @Output() changePage:  EventEmitter<any> = new EventEmitter();

    public back(): void {
        this.changePage.emit(false);
    }
  }
