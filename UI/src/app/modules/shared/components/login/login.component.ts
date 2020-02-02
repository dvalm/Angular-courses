import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { AuthorizationService } from '../../services/authorization.service';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss']
  })
  export class LoginComponent implements OnInit {

    public name: string;
    @Output() logoutSubmit:  EventEmitter<any> = new EventEmitter();

    constructor(public authorizationService: AuthorizationService) {}

    public ngOnInit(): void {
      this.name = this.authorizationService.getUserInfo().firstName;
    }

    public logout(): void {
      this.authorizationService.logout();
      this.logoutSubmit.emit();
    }
  }
