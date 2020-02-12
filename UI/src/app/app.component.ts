import {ChangeDetectionStrategy, Component, ViewEncapsulation} from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export class AppComponent {

  public isAuthenticated: boolean;

  constructor(private translate: TranslateService) {
    translate.setDefaultLang('en');
  }
}
