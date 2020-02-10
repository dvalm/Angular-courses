import {ChangeDetectionStrategy, Component, ViewEncapsulation, OnInit} from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { AuthorizationService } from './modules/shared/services/authorization.service';
import { Router, NavigationEnd, RouterEvent } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export class AppComponent implements OnInit {

  public isLoginPage: boolean;
  public isAuthenticated: boolean;
  public modalDialogOpen: boolean;

  constructor(private translate: TranslateService,
              private router: Router,
              private authorizationService: AuthorizationService) {
    translate.setDefaultLang('en');
  }

  public ngOnInit(): void {
    this.router.events.subscribe((path: RouterEvent)  => {
      if (path instanceof NavigationEnd) {
        this.isLoginPage = path.url === '/login' ? true : false;
      }
    });
  }

}
