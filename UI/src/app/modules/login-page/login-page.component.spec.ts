import { TestBed, async, ComponentFixture } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { LoginPageComponent } from './login-page.component';
import { AuthorizationService } from '../shared/services/authorization.service';

describe('LoginPageComponent', () => {
  let component: LoginPageComponent;
  let fixture: ComponentFixture<LoginPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
      ],
      declarations: [
        LoginPageComponent
      ],
      schemas: [
        NO_ERRORS_SCHEMA
      ],
      providers:  [
        AuthorizationService
      ],
    }).compileComponents();
    fixture = TestBed.createComponent(LoginPageComponent);
    component = fixture.componentInstance;
  }));

  it('should create component', () => {
    expect(component).toBeTruthy();
  });

  it('click login button and call method login()', () => {
    const comp = new LoginPageComponent(new AuthorizationService(null));
    spyOn(comp, 'login');
    comp.login();
    expect(comp.login).toHaveBeenCalled();
  });
});
