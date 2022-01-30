import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AssignmentsService } from './assignments.service';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private assignmentsService: AssignmentsService,
    private router:Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

      const path = route?.routeConfig?.path
      if((path == 'edit' || path == 'add') && this.assignmentsService.user?.role == 'Eleve') {
        this.router.navigate(["/login"]);
        return false;
      }

    // si on est connecté on accepte l'accès à la page
    if(this.assignmentsService.loggedin) {
      return true
    }
    // sinon on est renvoyé sur la page login
    else {
      this.router.navigate(["/login"]);
      return false;
    }


  }

}
