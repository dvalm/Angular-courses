import { TestBed, async, ComponentFixture } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { LoginComponent } from './login.component';
import { AuthorizationService } from '../../services/authorization.service';
import { User } from '../../models/user';

/* tslint:disable */
    // 3 is random number
const user = new User(3, 'name', 'lastName3', 'name3@mail.com', '333');
/* tslint:enable */
class AuthorizationServiceStub extends AuthorizationService {
  constructor() { super(null); }
  public logout(): void {}
  public getUserInfo(): User { return user; }
}

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        LoginComponent
      ],
      schemas: [
        NO_ERRORS_SCHEMA
      ],
      providers:  [
        { provide: AuthorizationService, useValue: AuthorizationServiceStub },
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
    const comp = new LoginComponent(new AuthorizationServiceStub());
    spyOn(comp, 'ngOnInit');
    comp.ngOnInit();
    expect(comp.ngOnInit).toHaveBeenCalled();
  });

  it('should call logout() and call authorizationService.logout()', () => {
    const comp = new LoginComponent(new AuthorizationServiceStub());
    spyOn(comp.authorizationService, 'logout');
    comp.logout();
    expect(comp.authorizationService.logout).toHaveBeenCalled();
  });
});
