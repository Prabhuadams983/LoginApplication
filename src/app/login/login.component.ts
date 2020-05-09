import { Component, OnInit, ViewChild } from '@angular/core';
import { AuthService } from '../services/auth-service.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  @ViewChild('userForm',{static:true}) signInForm:NgForm;
  @ViewChild('registerForm',{static:true}) signUpForm:NgForm;
  private userData:any;
  private loginForm=false;
  private regForm=true;
  constructor(private authService:AuthService){}

  onSubmit(type){
    if(type == 'L'){
    this.userData={
      email: this.signInForm.value.email,
      password: this.signInForm.value.password
  }
  this.authService.loginUser(this.userData);
}else{
  this.userData = {
    name:this.signUpForm.value.uname,
    email:this.signUpForm.value.uemail,
    password:this.signUpForm.value.upassword
  }

  this.authService.createNewUser(this.userData);
}

}

toggleForms(){
  if(this.loginForm){
    this.loginForm = false;
    this.regForm = true;
  }else{
    this.regForm = false;
    this.loginForm = true;
  }
}

}
