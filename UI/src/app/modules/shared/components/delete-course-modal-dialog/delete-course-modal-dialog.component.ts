import { Component, Input, Output, EventEmitter, ElementRef, OnInit } from '@angular/core';
import { ModalService } from '../../services/madal.service';

@Component({
    selector: 'app-delete-course-modal-dialog',
    templateUrl: './delete-course-modal-dialog.component.html',
    styleUrls: ['./delete-course-modal-dialog.component.scss']
  })
  export class DeleteCourseModalDialogComponent {

    @Output() public userAction: EventEmitter<boolean> = new EventEmitter<boolean>();

    public onUsesAction(value: boolean): void {
      this.userAction.emit(value);
    }
  }
