import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { isAuthenticatedSelector } from 'src/app/ngrx/authorization/authorization.selector';
import { GetUserAction } from 'src/app/ngrx/authorization/authorization.action';
import { AuthorizationState } from 'src/app/ngrx/authorization/authorization.state';

@Injectable({
  providedIn: 'root'
})
export class CoursesGuard implements CanActivate {

  constructor(private router: Router,
    private store$: Store<AuthorizationState>) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | boolean {
    let isAuthenticated: boolean;
    this.store$.dispatch(new GetUserAction());
    this.store$.pipe(select(isAuthenticatedSelector)).subscribe(
      (value: boolean) => isAuthenticated = value
    );
    if (!isAuthenticated) {
      this.router.navigateByUrl('/login');
    }
    return isAuthenticated;
  }
}
