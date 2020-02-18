import { Component, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';

@Component({
    selector: 'app-confirmation-dont-save-modal',
    templateUrl: './confirmation-dont-save-modal.component.html',
    styleUrls: ['./confirmation-dont-save-modal.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
  })
  export class ConfirmationDontSaveModalComponent {

    @Output() public userAction: EventEmitter<boolean> = new EventEmitter<boolean>();

    public onUsesAction(value: boolean): void {
      this.userAction.emit(value);
    }
  }
