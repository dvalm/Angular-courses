import { BehaviorSubject, Observable } from 'rxjs';

export class AuthorizationServiceStub {
    constructor() {}
    private _isAuthenticated: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(true);
    public isAuthenticated(): Observable<boolean> {
      return this._isAuthenticated.asObservable();
    }
}
