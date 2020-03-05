import {CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router} from '@angular/router';
import { Observable, of } from 'rxjs';
import { Injectable } from '@angular/core';
import { AuthorizationService } from '../services/authorization.service';

@Injectable({
  providedIn: 'root'
})
export class LoginGuard implements CanActivate  {

    constructor(private router: Router,
                private authorizationService: AuthorizationService) {}

    canActivate(): Observable<boolean> | boolean {

        this.authorizationService.isAuthenticated().subscribe(
          (isAuthenticated: boolean) => {
              if (isAuthenticated) {
                this.router.navigateByUrl('/courses');
              }
          }
        );
        return of(true);
    }
}
