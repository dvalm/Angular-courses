import {ChangeDetectionStrategy, Component, ViewEncapsulation} from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { AuthorizationService } from './modules/shared/services/authorization.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export class AppComponent {
  
  public visibleLoginPage: boolean;
  
  constructor(private translate: TranslateService,
              private authorizationService: AuthorizationService) {
    translate.setDefaultLang('en');
    this.visibleLoginPage = !this.authorizationService.isAuthenticated();
  }
}
