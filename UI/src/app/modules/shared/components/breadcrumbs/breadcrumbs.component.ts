import { Component, ChangeDetectionStrategy, ChangeDetectorRef, OnInit, OnDestroy } from '@angular/core';
import { Router, NavigationEnd, RouterEvent } from '@angular/router';
import { CoursesService } from 'src/app/modules/shared/services/courses.service';
import { Subscription } from 'rxjs';
import { AuthorizationService } from '../../services/authorization.service';

@Component({
    selector: 'app-breadcrumbs',
    templateUrl: './breadcrumbs.component.html',
    styleUrls: ['./breadcrumbs.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
  })
  export class BreadcrumbsComponent implements OnInit, OnDestroy {

    public routePath: string;
    private subscriptionURL: Subscription;
    private subscriptionIsAuthenticated: Subscription;
    public isAuthenticated: boolean;

    constructor(private router: Router,
                private changeDetectorRef: ChangeDetectorRef,
                private authorizationService: AuthorizationService,
                private coursesService: CoursesService) {}

    public ngOnInit(): void {
      this.subscriptionURL = this.router.events.subscribe( (path: RouterEvent) => {
        if (path instanceof NavigationEnd) {
          this.setRoutePath(path.urlAfterRedirects);
          this.changeDetectorRef.detectChanges();
        }
      });
      this.subscriptionIsAuthenticated = this.authorizationService.isAuthenticated().subscribe(
        (value: boolean) => {
          this.isAuthenticated = value;
          this.changeDetectorRef.detectChanges();
        }
      );
    }

    public ngOnDestroy(): void {
      this.subscriptionURL.unsubscribe();
      this.subscriptionIsAuthenticated.unsubscribe();
    }

    private setRoutePath(url: string): void {
      const path: string[] = url.slice(1).split('/');
      const id = parseInt(path[path.length - 1 ], 10);
      if (id) {
        path[path.length - 1] = this.coursesService.getCourseById(id).title;
      }
      this.routePath = path.join(' / ');
    }
  }
