import { Component, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';

@Component({
    selector: 'app-confirmation-delete-modal',
    templateUrl: './confirmation-delete-modal.component.html',
    styleUrls: ['./confirmation-delete-modal.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
  })
  export class ConfirmationDeleteModalComponent {

    @Output() public userAction: EventEmitter<boolean> = new EventEmitter<boolean>();

    public onUsesAction(value: boolean): void {
      this.userAction.emit(value);
    }
  }
