import {Component, ChangeDetectionStrategy} from '@angular/core';
import { Store } from '@ngrx/store';
import { LoginUser } from 'src/app/ngrx/authorization/authorization.action';
import { AuthorizationState } from 'src/app/ngrx/authorization/authorization.state';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LoginPageComponent {

    constructor(private store$: Store<AuthorizationState>) {}

    public email: string;
    public password: string;

    public login(): void {
      this.store$.dispatch(new LoginUser({email: this.email, password: this.password}));
    }
}
