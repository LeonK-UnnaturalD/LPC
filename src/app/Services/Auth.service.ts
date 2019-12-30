import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import AuthResponse from '../Classes/AuthResponse';
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { ErrorService } from './Error.service';
import * as queryString from 'query-string';
import { ActivatedRoute } from '@angular/router';
import { UserService } from './User.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private url: string = "https://findpinearyou.herokuapp.com/api/";

  constructor(private http: HttpClient, public Error: ErrorService, private Route: ActivatedRoute, private User: UserService) { }

  public CreateAccount(data: any):Promise<AuthResponse> {
    return this.http.post<AuthResponse>(this.url + "register", data).toPromise();
  }

  public Login(data: any):Promise<AuthResponse> {
    return this.http.post<AuthResponse>(this.url + "login", data).toPromise();
  }

  public ResetPasswordRequest(data: any):Promise<void> {
    return this.http.post<void>(this.url + "reset_password", data).toPromise();
  }

  public ResetPasswordResponse(data: any):Promise<void> {
    return this.http.post<void>(this.url + "reset_password_final", data).toPromise();
  }

  public Check(Id: string):Promise<void> {
    const data = { Id };
    return this.http.post<void>(this.url + "reset_password_check", data).toPromise();
  }

  public GetGoogleAuth():string {
    const stringifiedParams = queryString.stringify({
      client_id: '453586567891-69igeih0v7qfbtrhh73a29p30o20s8o8.apps.googleusercontent.com',
      redirect_uri: 'https://findpinearyou.herokuapp.com/authenticate/google',
      scope: [
        'https://www.googleapis.com/auth/userinfo.email',
        'https://www.googleapis.com/auth/userinfo.profile',
      ].join(' '),
      response_type: 'code',
      access_type: 'offline',
      prompt: 'consent',
    });

    return `https://accounts.google.com/o/oauth2/v2/auth?${stringifiedParams}`;
  }

  public GetFacebookAuth():string {
    const stringifiedParams = queryString.stringify({
      client_id: '504187460442157',
      redirect_uri: 'https://findpinearyou.herokuapp.com/authenticate/facebook/',
      scope: ['email', 'user_friends'].join(','), 
      response_type: 'code',
      auth_type: 'rerequest',
      display: 'popup',
    });
    
    return `https://www.facebook.com/v4.0/dialog/oauth?${stringifiedParams}`;
  }

  public GetThirdPartyUser():any {
    const token: string = this.Route.snapshot.queryParamMap.get('token');
    const id: string = this.Route.snapshot.queryParamMap.get('user');

    if(!token || !id)
    {
      return null;
    }
    else
    {
      return { 
        Id: id,
        Token: token
      }
    }
  }

}
