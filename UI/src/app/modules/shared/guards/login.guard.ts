import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { Injectable } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { isAuthenticatedSelector } from 'src/app/ngrx/authorization/authorization.selector';
import { AuthorizationState } from 'src/app/ngrx/authorization/authorization.state';

@Injectable({
  providedIn: 'root'
})
export class LoginGuard implements CanActivate {

  constructor(private router: Router,
    private store$: Store<AuthorizationState>) { }

  canActivate(): Observable<boolean> | boolean {

    this.store$.pipe(select(isAuthenticatedSelector)).subscribe(
      (isAuthenticated: boolean) => {
        if (isAuthenticated) {
          this.router.navigateByUrl('/courses');
        }
      }
    );
    return of(true);
  }
}
