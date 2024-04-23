import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, CanActivateFn, GuardResult, MaybeAsync, Router, RouterStateSnapshot } from "@angular/router";
import { JwtHelperService } from "@auth0/angular-jwt";

@Injectable({
    providedIn: 'root'
  })
export class AuthGuard{

    constructor(private router: Router) {
        console.log("initialieing authguard")
    }
    public jwtHelper: JwtHelperService = new JwtHelperService();
    canActivate(): boolean {
        console.log("authenticating")
        const token = localStorage.getItem('token')
        console.log("authenticating")
        if(token && !this.jwtHelper.isTokenExpired(token)){
            console.log("authenticating")
            return true;
        }

        this.router.navigate(['login'])
        return false;
    }
}