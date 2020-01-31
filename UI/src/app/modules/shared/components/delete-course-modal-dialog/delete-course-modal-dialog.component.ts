import { Component, Input, Output, EventEmitter, ElementRef, OnInit } from '@angular/core';
import { DeleteCourseModalDialogService } from '../../services/delete-course-modal-dialog.service';

@Component({
    selector: 'app-delete-course-modal-dialog',
    templateUrl: './delete-course-modal-dialog.component.html',
    styleUrls: ['./delete-course-modal-dialog.component.scss']
  })
  export class DeleteCourseModalDialogComponent implements OnInit{
  
    private element: any;

    constructor(private el: ElementRef,
                private deleteCourseModalDialogService: DeleteCourseModalDialogService){
      this.element = el.nativeElement;
    }

    public ngOnInit(): void {
      let modalDialog: DeleteCourseModalDialogComponent = this;
      this.deleteCourseModalDialogService.add(this);
      this.element.addEventListener('click', function (e: any) {
        if (e.target.className === 'modal-dialog__background') {
            modalDialog.close();
        }
    });
    }

    public open():void {
      this.element.querySelector(".modal-dialog").style.display = 'block';
    }

    public close():void {
      this.element.querySelector(".modal-dialog").style.display = 'none';
    }

    public daleteCourse(deleteCourse: boolean):void {
      this.deleteCourseModalDialogService.deleteCourse(deleteCourse);
    }
  }