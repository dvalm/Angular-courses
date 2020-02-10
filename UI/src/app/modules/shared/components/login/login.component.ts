import { Component, OnInit, Output, EventEmitter, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { AuthorizationService } from '../../services/authorization.service';
import { Subscription } from 'rxjs';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
  })
  export class LoginComponent implements OnInit {

    public name: string;
    subscription: Subscription;

    constructor(public authorizationService: AuthorizationService,
                private changeDetectorRef: ChangeDetectorRef) {}

    public ngOnInit(): void {
      this.name =  this.authorizationService.getUserInfo().firstName;
    }

    public logout(): void {
      this.authorizationService.logout();
    }
  }
