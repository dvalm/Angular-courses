import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { Injectable } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { isAuthenticatedSelector } from 'src/app/ngrx/authorization/authorization.selector';
import { AuthorizationState } from 'src/app/ngrx/authorization/authorization.state';
import { GetUserAction } from 'src/app/ngrx/authorization/authorization.action';
import { AuthorizationService } from '../services/authorization.service';

@Injectable({
  providedIn: 'root'
})
export class LoginGuard implements CanActivate {

  constructor(private router: Router,
    private store$: Store<AuthorizationState>,
    private authorizationService: AuthorizationService) { }

  canActivate(): Observable<boolean> | boolean {
    if(localStorage.getItem(this.authorizationService.token)) {
      this.store$.dispatch(new GetUserAction());
    }
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
