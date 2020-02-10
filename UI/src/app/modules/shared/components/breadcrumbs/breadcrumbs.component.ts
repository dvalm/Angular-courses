import { Component, ChangeDetectionStrategy, ChangeDetectorRef, OnInit } from '@angular/core';
import { Router, NavigationEnd, RouterEvent } from '@angular/router';
import { CoursesService } from 'src/app/modules/shared/services/courses.service';

@Component({
    selector: 'app-breadcrumbs',
    templateUrl: './breadcrumbs.component.html',
    styleUrls: ['./breadcrumbs.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
  })
  export class BreadcrumbsComponent implements OnInit {

    public routePath: string;

    constructor(private router: Router,
                private changeDetectorRef: ChangeDetectorRef,
                private coursesService: CoursesService) {}

    public ngOnInit(): void {
      this.router.events.subscribe( (path: RouterEvent) => {
        if (path instanceof NavigationEnd) {
          this.setRoutePath(path.url);
          this.changeDetectorRef.detectChanges();
        }
      });
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
