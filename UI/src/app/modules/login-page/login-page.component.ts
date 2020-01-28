import {Component} from '@angular/core';
import { AuthorizationService } from '../shared/services/authorization.service';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss'],
})
export class LoginPageComponent {

    constructor(private authorizationService: AuthorizationService){}

    public email: string;
    public password: string;

    public login():void {
        this.authorizationService.login(this.email, this.password);
    }
  
}
