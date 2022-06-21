import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { catchError } from 'rxjs';
import { JwtHelperService } from "@auth0/angular-jwt";
import { AUTH_URL } from 'src/app/app.constants';
import { LoginService } from 'src/app/Services/login.service';
//import { stringify } from 'querystring';
//import { clearScreenDown } from 'readline';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent  {

  user: { username: string, password: string } = { username: "", password: "" };

  isLoginFailed: boolean = false;
  isLoading = false;


  constructor(private router: Router, public loginService: LoginService) { }


  public LoginUser() {

    this.isLoading = true;

    if (this.isLoginFailed != false) {
      this.isLoginFailed = false;
    }

    this.loginService.login(this.user.username, this.user.password).subscribe({
      next: data => {
        console.log(data.status);

        if (data.token !== null) {
          const token = data.token;
          const refreshToken = data.refreshToken;
          localStorage.setItem("jwt", token);
          localStorage.setItem("refreshToken", refreshToken);

          let role = JSON.parse(window.atob(token.split('.')[1]))["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"];

          let username = JSON.parse(window.atob(token.split('.')[1]))["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name"];

          localStorage.setItem("username", username);

          localStorage.setItem("role", role);
          //ovih 6 ispod msm da ne treba ako cu u adminguard
          if (role === "Admin") {
            this.router.navigate(["/admin"]);
          }
          else {
            this.router.navigate(["/storeCheck"]);
          }
        } else {
          this.isLoginFailed = true;
        }
      },
      error: (e) => {
        if (e.status == 401) {
          this.isLoading = false;
          this.isLoginFailed = true;
        }
      }
    });

  }
}
