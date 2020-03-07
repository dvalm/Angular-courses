import { Component, ChangeDetectionStrategy, OnInit, ChangeDetectorRef} from '@angular/core';
import { Store, select } from '@ngrx/store';
import { isAuthenticatedSelector } from 'src/app/ngrx/authorization/authorization.selector';
import { AuthorizationState } from 'src/app/ngrx/authorization/authorization.state';

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
  })
  export class HeaderComponent implements OnInit {

    public isAuthenticated: boolean;

    constructor(private changeDetectorRef: ChangeDetectorRef,
                private store$: Store<AuthorizationState>) {}

    public ngOnInit(): void {
      this.store$.pipe(select(isAuthenticatedSelector)).subscribe(
        (value: boolean) => {
          this.isAuthenticated = value;
          this.changeDetectorRef.detectChanges();
        }
      );
    }
  }
