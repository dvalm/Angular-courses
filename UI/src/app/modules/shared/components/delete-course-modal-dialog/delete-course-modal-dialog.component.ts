import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
    selector: 'app-delete-course-modal-dialog',
    templateUrl: './delete-course-modal-dialog.component.html',
    styleUrls: ['./delete-course-modal-dialog.component.scss']
  })
  export class DeleteCourseModalDialogComponent{

    @Output() deleteCourse:  EventEmitter<any> = new EventEmitter<any>();

    public daleteCourse(deleteCourse: boolean):void {

    }
  }