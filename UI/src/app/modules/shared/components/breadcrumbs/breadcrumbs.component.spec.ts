import { TestBed, async, ComponentFixture } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA, ChangeDetectorRef } from '@angular/core';
import { BreadcrumbsComponent } from './breadcrumbs.component';
import { AuthorizationService } from '../../services/authorization.service';
import { CoursesService } from '../../services/courses.service';
import { Router } from '@angular/router';

class CoursesServiceStub {
  constructor() {}
  public isAuthenticated(): boolean { return true; }
}
const router = {
  navigateByUrl: jasmine.createSpy('navigate')
};

describe('BreadcrumbsComponent', () => {
  let component: BreadcrumbsComponent;
  let fixture: ComponentFixture<BreadcrumbsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [],
      declarations: [
        BreadcrumbsComponent
      ],
      schemas: [
        NO_ERRORS_SCHEMA
      ],
      providers:  [
        AuthorizationService,
        ChangeDetectorRef,
        { provide: Router, useValue: router },
        { provide: CoursesService, useValue : CoursesServiceStub }
      ],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BreadcrumbsComponent);
    component = fixture.componentInstance;
  });

  it('should create component', () => {
    expect(component).toBeTruthy();
  });

  it('should call navigate(\'courses\') and naviagate when path=\'courses\'', () => {
    const path = 'courses';
    component.navigate(path);
    expect(router.navigateByUrl).toHaveBeenCalledWith('/' + path);
  });

  it('should call navigate(\'aaa\') and naviagate when path=\'courses\'', () => {
    const path = 'aaa';
    component.navigate(path);
    expect(router.navigateByUrl).not.toHaveBeenCalledWith('/' + path);
  });
});
