import { Component, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';
import { LoginUserLogoutAction } from 'src/app/ngrx/authorization/authorization.action';
import { authorizationUserFirstNameSelector } from 'src/app/ngrx/authorization/authorization.selector';
import { AuthorizationState } from 'src/app/ngrx/authorization/authorization.state';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
  })
  export class LoginComponent {

    public name: Observable<string> = this.store$.pipe(select(authorizationUserFirstNameSelector));

    constructor(private store$: Store<AuthorizationState>) {}

    public logout(): void {
      this.store$.dispatch(new LoginUserLogoutAction());
    }
  }
