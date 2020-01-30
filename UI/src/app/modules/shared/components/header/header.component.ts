import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.scss']
  })
  export class HeaderComponent{

    @Input() visibleLoginPage: boolean;
    @Output() logoutSubmit:  EventEmitter<any> = new EventEmitter<any>();

    public logout():void {
      this.logoutSubmit.emit();
    }
  
  }