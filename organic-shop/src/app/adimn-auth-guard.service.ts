import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { AuthService } from './auth.service';
import { UserService } from './user.service';
import 'rxjs-compat/Rx';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class AdimnAuthGuardService implements CanActivate {

  constructor(private auth: AuthService ,private userService:UserService) { }

  canActivate():Observable<boolean>
  {
   return this.auth.appUser$
    .map(appUser=>appUser.isAdmin);
  }
}
