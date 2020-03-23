import { TestBed, async, ComponentFixture } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { LoginPanelComponent } from './login-panel.component';
import { AuthorizationService } from '../../services/authorization.service';
import { User } from '../../models/user';
import { AuthorizationServiceStub } from '../../testing-stub/authorization-service-stub.mock';
import { HttpClientTestingModule } from '@angular/common/http/testing';

const user = new User(3, 'name', 'lastName3', 'name3@mail.com', '333');

const authorizationServiceStub = new AuthorizationServiceStub();

describe('LoginPanelComponent', () => {
  let component: LoginPanelComponent;
  let fixture: ComponentFixture<LoginPanelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        LoginPanelComponent
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
    fixture = TestBed.createComponent(LoginPanelComponent);
    component = fixture.componentInstance;
  });

  afterEach(() => {
    fixture.destroy();
  });

  it('should create component', () => {
    expect(component).toBeTruthy();
  });

  it('should call logout() and call authorizationService.logout()', () => {
    spyOn(component.authorizationService, 'logout');
    component.logout();
    expect(component.authorizationService.logout).toHaveBeenCalled();
  });
});
