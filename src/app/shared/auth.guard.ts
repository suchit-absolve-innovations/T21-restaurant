import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot } from '@angular/router';
import { AuthService } from './service/auth.service';
import { Router } from '@angular/router';
// import { SocialAuthService, SocialUser } from 'angularx-social-login';
import { map, Observable, tap } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
 
  constructor(private router: Router, private authService: AuthService,) { }
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot) {
    const currentUser = this.authService.currentUserValue;

    if (currentUser) {
      //authorised so return true
      return true;
    }
    // not logged in so redirect to login page 
    this.router.navigate(['/login']);
    return false;
  }

  // canActivate1(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
  //   return this.socialAuthService.authState.pipe(
  //     map((socialUser: SocialUser) => !!socialUser),
  //     tap((isLoggedIn: boolean) => {
  //       if (!isLoggedIn) {
  //         this.router.navigate(['login']);
  //       }
  //     })
  //   );
  // }

}
