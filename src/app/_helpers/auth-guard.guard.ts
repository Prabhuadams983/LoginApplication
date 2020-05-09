import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from '../services/auth-service.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardGuard implements CanActivate {

  constructor(private authService:AuthService,private router:Router){}

  canActivate(){
    if(!this.authService.isLoggedIn){
      this.router.navigate(['login']);
      return false;
    }
    return true;
  }
  
  
}
