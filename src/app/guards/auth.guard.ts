import { Injectable } from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree} from '@angular/router';
import { Observable } from 'rxjs';
// @ts-ignore
import {CookieService} from "ngx-cookie-service";

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate  {

    constructor(private router: Router, private _cookieService: CookieService) {
    }

    canActivate(): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

        const cook = this._cookieService.get('user');

        console.log('auth guard', cook)

        if (!cook) {

            this.router.navigate(['login']);

            return false;

        } else {

            return true;

        }

    }



}
