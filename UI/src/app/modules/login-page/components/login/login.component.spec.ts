import { TestBed, async, ComponentFixture } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { LoginComponent } from './login.component';
import { By } from '@angular/platform-browser';
import { AuthorizationServiceStub } from 'src/app/modules/shared/testing-stub/authorization-service-stub.mock';
import { AuthorizationService } from 'src/app/modules/shared/services/authorization.service';

const authorizationServiceStub = new AuthorizationServiceStub();

describe('LoginPageComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
      ],
      declarations: [
        LoginComponent
      ],
      schemas: [
        NO_ERRORS_SCHEMA
      ],
      providers:  [
        { provide: AuthorizationService, useValue: authorizationServiceStub },
      ],
    }).compileComponents();
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
  }));

  afterEach(() => {
    fixture.destroy();
  });

  it('should create component', () => {
    expect(component).toBeTruthy();
  });

  it('click login button and call method login()', () => {
    spyOn(component, 'login');
    component.login();
    expect(component.login).toHaveBeenCalled();
  });

  it('click login button and call method login()', () => {
    spyOn(component, 'login');
    fixture.debugElement.query(By.css('.login__button')).triggerEventHandler('click', null);
    expect(component.login).toHaveBeenCalled();
  });
});
