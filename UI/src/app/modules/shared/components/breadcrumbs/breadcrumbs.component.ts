import { Component, ChangeDetectionStrategy, ChangeDetectorRef, OnInit, OnDestroy } from '@angular/core';
import { Router, NavigationEnd, RouterEvent } from '@angular/router';
import { Subscription } from 'rxjs';
import { Store, select } from '@ngrx/store';
import { isAuthenticatedSelector } from 'src/app/ngrx/authorization/authorization.selector';
import { AuthorizationState } from 'src/app/ngrx/authorization/authorization.state';
import { getCourseByIdSelector } from 'src/app/ngrx/courses/courses.selector';
import { Course } from 'src/app/modules/courses-page/models/course';

@Component({
    selector: 'app-breadcrumbs',
    templateUrl: './breadcrumbs.component.html',
    styleUrls: ['./breadcrumbs.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
  })
  export class BreadcrumbsComponent implements OnInit, OnDestroy {

    public routePath: string[];
    public isAuthenticated: boolean;
    private subscriptionURL: Subscription;

    constructor(private router: Router,
                private changeDetectorRef: ChangeDetectorRef,
                private store$: Store<AuthorizationState>) {}

    public ngOnInit(): void {
      this.subscriptionURL = this.router.events.subscribe( (path: RouterEvent) => {
        if (path instanceof NavigationEnd) {
          this.setRoutePath(path.urlAfterRedirects);
          this.changeDetectorRef.detectChanges();
        }
      });
      this.store$.pipe(select(isAuthenticatedSelector)).subscribe(
        (value: boolean) => {
          this.isAuthenticated = value;
          this.changeDetectorRef.detectChanges();
        }
      );
    }

    public navigate(path: string): void {
      if (path === 'courses') {
        this.router.navigateByUrl('/courses');
      }
    }

    public ngOnDestroy(): void {
      this.subscriptionURL.unsubscribe();
    }

    private setRoutePath(url: string): void {
      this.routePath = url.slice(1).split('/');
      const id = parseInt(this.routePath[this.routePath.length - 1 ], 10);
      if (id) {
        this.store$.pipe(select(getCourseByIdSelector, {id: id})).subscribe(
          (course: Course) => {
            this.routePath[this.routePath.length - 1] = course.title;
          }
        );
      }
    }
  }
