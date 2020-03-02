import { BehaviorSubject, Observable } from 'rxjs';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { User } from '../models/user';

export class AuthorizationServiceStub {
  private readonly token: string = 'userToken';
  private _isAuthenticated: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  private _baseURL = 'http://localhost:3004';
  private _user: BehaviorSubject<User>  = new BehaviorSubject<User>(null);

  constructor() {}

  public isAuthenticated(): Observable<boolean> {
    return this._isAuthenticated.asObservable();
  }
  public login(email: string, password: string): void {}
  public logout(): void {}
  public getUserInfo(): Observable<User> {
    return null;
  }
}
