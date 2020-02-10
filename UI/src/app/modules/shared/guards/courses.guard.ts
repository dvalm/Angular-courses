import {CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router} from '@angular/router';
import {Observable} from 'rxjs';
import { Injectable } from '@angular/core';
import { AuthorizationService } from '../services/authorization.service';

@Injectable()
export class CoursesGuard implements CanActivate  {

    constructor(private router: Router,
                private authorizationService: AuthorizationService) {}

    canActivate(route: ActivatedRouteSnapshot,
                state: RouterStateSnapshot): Observable<boolean> | boolean {
        let isAuthenticated: boolean;
        this.authorizationService.isAuthenticated().subscribe(
            (value: boolean) => isAuthenticated = value
          );
        if (isAuthenticated) {
            return true;
        } else {
            this.router.navigateByUrl('/login');
            return false;
        }
    }
}
