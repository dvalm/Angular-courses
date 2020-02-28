import { TestBed, async, getTestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { AuthorizationService } from './authorization.service';
import { User } from '../models/user';
import { RouterStub } from '../testing-stub/router-stub.mock';
import { HttpClientTestingModule } from '@angular/common/http/testing';

const routerStub = new RouterStub();
/* tslint:disable */
    // all numbers are randon
const users = [new User(1, 'name1', 'lastName1', 'name1@mail.com', '111'),
              new User(2, 'name2', 'lastName2', 'name2@mail.com', '222'),
              new User(4, 'lera', 'lera2', 'lera', 'lera'),
              new User(3, 'name3', 'lastName3', 'name3@mail.com', '333')];
/* tslint:enable */

describe('AuthorizationService', () => {
  let injector: TestBed;
  let service: AuthorizationService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      providers:  [
        AuthorizationService,
        { provide: Router, useValue: routerStub },
      ],
      imports: [
        HttpClientTestingModule
      ],
    }).compileComponents();
  }));

  beforeEach(() => {
    injector = getTestBed();
    service = injector.get(AuthorizationService);
  });

  it('should call logout()', () => {
    service.logout();
    expect(routerStub.navigateByUrl).toHaveBeenCalledWith('/login');
  });

  it('should call login()', () => {
    spyOn(service, 'login');
    service.login('name1@mail.com', '111');
    expect(service.login).toHaveBeenCalled();
  });

  it('should call getUserInfo() and return User', () => {
    spyOn(service, 'getUserInfo');
    service.getUserInfo();
    expect(service.getUserInfo).toHaveBeenCalled();
  });
});
