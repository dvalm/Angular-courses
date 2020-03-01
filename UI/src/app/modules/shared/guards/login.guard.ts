import {CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router} from '@angular/router';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { AuthorizationService } from '../services/authorization.service';

@Injectable({
  providedIn: 'root'
})
export class LoginGuard implements CanActivate  {

    constructor(private router: Router,
                private authorizationService: AuthorizationService) {}

    canActivate(): Observable<boolean> | boolean {
        let isAuthenticated: boolean;
        this.authorizationService.isAuthenticated().subscribe(
            (value: boolean) => isAuthenticated = value
          );
        if (isAuthenticated) {
          this.router.navigateByUrl('/courses');
        }
        return true;
    }
}