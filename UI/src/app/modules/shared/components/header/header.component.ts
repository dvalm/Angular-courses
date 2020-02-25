import { Component, ChangeDetectionStrategy, OnInit, OnDestroy, ChangeDetectorRef} from '@angular/core';
import { AuthorizationService } from '../../services/authorization.service';
import { Subscription } from 'rxjs';

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
  })
  export class HeaderComponent implements OnInit, OnDestroy {

    public isAuthenticated: boolean;
    public subscription: Subscription;

    constructor(private authorizationService: AuthorizationService,
                private changeDetectorRef: ChangeDetectorRef) {}

    public ngOnInit(): void {
      this.subscription = this.authorizationService.isAuthenticated().subscribe(
        (value: boolean) => {
          this.isAuthenticated = value;
          this.changeDetectorRef.detectChanges();
        }
      );
    }

    public ngOnDestroy(): void {
      this.subscription.unsubscribe();
    }
  }
