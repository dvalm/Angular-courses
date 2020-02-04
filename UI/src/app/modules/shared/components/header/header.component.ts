import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.scss']
  })
  export class HeaderComponent {

    @Input() visibleLoginPage: boolean;
    @Output() logoutSubmit:  EventEmitter<void> = new EventEmitter();

    public logout(): void {
      this.logoutSubmit.emit();
    }
  }
