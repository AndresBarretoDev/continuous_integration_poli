import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { Observable } from 'rxjs';
import { UserAuthService } from '../services/user-auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {


  constructor(private userAuth:UserAuthService){

  }

  canActivate(): Observable<boolean> | Promise<boolean> |boolean  {



    return this.userAuth.isAuth();
  }

}
