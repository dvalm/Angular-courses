import {ChangeDetectionStrategy, Component, ViewEncapsulation, OnInit} from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { AuthorizationService } from './modules/shared/services/authorization.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export class AppComponent implements OnInit{
  
  public isAuthenticated: boolean;
  
  constructor(private translate: TranslateService,
              private authorizationService: AuthorizationService) {
    translate.setDefaultLang('en');
    //this.visibleLoginPage = this.authorizationService.isAuthenticated();
  }

  ngOnInit(): void {
    this.handleLogin();
  }

  public handleLogin(): void { 
    this.isAuthenticated = this.authorizationService.isAuthenticated; 
  };
}
