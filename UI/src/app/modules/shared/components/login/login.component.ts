import { Component, OnInit, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { AuthorizationService } from '../../services/authorization.service';
import { IUser } from '../../interfaces/user';
import { User } from '../../models/user';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
  })
  export class LoginComponent implements OnInit {

    public name: string;

    constructor(public authorizationService: AuthorizationService) {}

    public ngOnInit(): void {
      this.authorizationService.getUserInfo().subscribe(
        (user: User) => this.name = user.firstName
      );
    }

    public logout(): void {
      this.authorizationService.logout();
    }
  }
