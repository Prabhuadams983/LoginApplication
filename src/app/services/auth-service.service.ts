import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpParams, HttpBackend } from '@angular/common/http';
import { Router } from '@angular/router';
import { throwError } from 'rxjs';
import {environment} from '../../environments/environment';
import { MatSnackBar } from '@angular/material/snack-bar';
@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private http:HttpClient;

  constructor(private router:Router,handler:HttpBackend,
              private snackBar : MatSnackBar) {
                this.http = new HttpClient(handler);
               }

  loginUser(user){
    return this.http.post(`${environment.localUrl}`+"loginUser",user,{observe:'response',responseType:'text'}).subscribe((res)=>{
      let token = res.headers.get('Auth_Token');
      if(token!=null){
        localStorage.setItem('Auth_Token',token);
        this.router.navigate(['home']);
      }
    },(error)=>{
      this.handleError(error);
    });
  }

  createNewUser(user){
    return this.http.post(`${environment.localUrl}`+"createUser",user,{observe:'response',responseType:'text'}).subscribe((res)=>{
      let token = res.headers.get('Auth_Token');
      if(token != null){
        localStorage.setItem('Auth_Token',token);
        this.router.navigate(['home']);
      }
    });
  }

  get isLoggedIn():boolean{
    let authToken = localStorage.getItem("Auth_Token");
    return (authToken!== null) ? true : false;
  }

  getToken(){
    return localStorage.getItem("Auth_Token");
  }

  onLogOut(){
    let removeToken = localStorage.removeItem("Auth_Token");
    if(removeToken == null){
      this.router.navigate(['login']);
    }
  }

  // Error 
  handleError(error: HttpErrorResponse) {
    let msg = '';
    if (error.error instanceof ErrorEvent) {
      // client-side error
      msg = error.error.message;
    } else {
      // server-side error
      msg = `Error Code: ${error.status}\nMessage: ${error.error}`;
      if(error.status == 403 || error.status == 401){
        this.snackBar.open(error.error,"",{
          duration:3000,
          verticalPosition:"top",
          panelClass:['error_snack_bar']
        });
      }
    }
  }

}
