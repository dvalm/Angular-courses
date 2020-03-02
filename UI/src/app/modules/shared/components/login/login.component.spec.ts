import { TestBed, async, ComponentFixture } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { LoginComponent } from './login.component';
import { AuthorizationService } from '../../services/authorization.service';
import { User } from '../../models/user';
import { AuthorizationServiceStub } from '../../testing-stub/authorization-service-stub.mock';
import { HttpClientTestingModule } from '@angular/common/http/testing';

/* tslint:disable */
    // 3 is random number
const user = new User(3, 'name', 'lastName3', 'name3@mail.com', '333');
/* tslint:enable */
const authorizationServiceStub = new AuthorizationServiceStub();

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        LoginComponent
      ],
      imports: [
        HttpClientTestingModule
      ],
      schemas: [
        NO_ERRORS_SCHEMA
      ],
      providers:  [
        { provide: AuthorizationService, useValue: authorizationServiceStub },
      ],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
  });

  afterEach(() => {
    fixture.destroy();
  });

  it('should create component', () => {
    expect(component).toBeTruthy();
  });

  it('should call ngOnInit()', () => {
    spyOn(component, 'ngOnInit');
    component.ngOnInit();
    expect(component.ngOnInit).toHaveBeenCalled();
  });

  it('should call logout() and call authorizationService.logout()', () => {
    spyOn(component.authorizationService, 'logout');
    component.logout();
    expect(component.authorizationService.logout).toHaveBeenCalled();
  });
});
