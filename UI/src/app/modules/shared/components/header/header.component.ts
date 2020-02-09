import { Component, Input, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
  })
  export class HeaderComponent {

    @Input() visibleLoginPage: boolean;
    @Output() logoutSubmit:  EventEmitter<void> = new EventEmitter();

    public logout(): void {
      this.logoutSubmit.emit();
    }
  }
