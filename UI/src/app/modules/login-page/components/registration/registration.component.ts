import { Component, ChangeDetectionStrategy } from '@angular/core';
import { ModalService } from 'src/app/modules/shared/services/modal.service';
import {
  ConfirmationDontSaveModalComponent
} from 'src/app/modules/shared/components/confirmation-dont-save-modal/confirmation-dont-save-modal.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class RegistrationComponent {

  constructor(private router: Router,
              private modalService: ModalService) { }

  public goBack(): void {
    const modalRef = this.modalService.openModal(ConfirmationDontSaveModalComponent);
    modalRef.instance.userAction.subscribe((goBack: boolean) => {
      if (goBack) {
        this.router.navigateByUrl('/login');
      }
      this.modalService.closeModel(modalRef);
    });
  }
}
