import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, CanActivateFn, GuardResult, MaybeAsync, Router, RouterStateSnapshot } from "@angular/router";
import { JwtHelperService } from "@auth0/angular-jwt";

@Injectable({
    providedIn: 'root'
  })
export class AuthGuard{

    constructor(private router: Router) {}
    public jwtHelper: JwtHelperService = new JwtHelperService();
    
    canActivate(): boolean {
        const token = localStorage.getItem('token')
        if(token && !this.jwtHelper.isTokenExpired(token)){
            return true;
        }

        this.router.navigate(['login'])
        return false;
    }
}