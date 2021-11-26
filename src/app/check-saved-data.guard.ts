import { Injectable } from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, CanDeactivate, RouterStateSnapshot, UrlTree} from '@angular/router';
import { Observable } from 'rxjs';
import {PageWithForms} from "./shared/page-with-forms";

@Injectable({
  providedIn: 'root'
})
export class CheckSavedDataGuard implements CanDeactivate<PageWithForms> {
  canDeactivate(component: PageWithForms, currentRoute: ActivatedRouteSnapshot, currentState: RouterStateSnapshot, nextState?: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree{
       if(!component.canExit()){
         return confirm("data will be removed")
       }
       return true;
  }
}
