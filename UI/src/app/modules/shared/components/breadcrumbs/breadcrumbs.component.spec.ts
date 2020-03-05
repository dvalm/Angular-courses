import { TestBed, async, ComponentFixture } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA, ChangeDetectorRef } from '@angular/core';
import { BreadcrumbsComponent } from './breadcrumbs.component';
import { AuthorizationService } from '../../services/authorization.service';
import { CoursesService } from '../../../courses-page/services/courses.service';
import { Router } from '@angular/router';
import { CoursesServiceStub } from '../../testing-stub/courses-service-stub.mock';
import { RouterStub } from '../../testing-stub/router-stub.mock';
import { AuthorizationServiceStub } from '../../testing-stub/authorization-service-stub.mock';

const routerStub = new RouterStub();
const authorizationServiceStub = new AuthorizationServiceStub();

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
        ChangeDetectorRef,
        { provide: AuthorizationService, useValue: authorizationServiceStub },
        { provide: Router, useValue: routerStub },
        { provide: CoursesService, useValue : new CoursesServiceStub() }
      ],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BreadcrumbsComponent);
    component = fixture.componentInstance;
    component.ngOnInit();
  });

  afterEach(() => {
    fixture.destroy();
  });

  it('should create component', () => {
    expect(component).toBeTruthy();
  });

  it('should call navigate(\'courses\') and naviagate when path=\'courses\'', () => {
    const path = 'courses';
    component.navigate(path);
    expect(routerStub.navigateByUrl).toHaveBeenCalledWith('/' + path);
  });

  it('should call navigate(\'aaa\') and naviagate when path=\'courses\'', () => {
    const path = 'aaa';
    component.navigate(path);
    expect(routerStub.navigateByUrl).not.toHaveBeenCalledWith('/' + path);
  });
});
