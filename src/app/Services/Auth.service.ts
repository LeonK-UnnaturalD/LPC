import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import AuthResponse from '../Classes/AuthResponse';
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { ErrorService } from './Error.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private url: string = "https://findpinearyou.herokuapp.com/api/";

  constructor(private http: HttpClient, public Error: ErrorService) { }

  public CreateAccount(data: any):Observable<AuthResponse> {
    return this.http.post<AuthResponse>(this.url + "register", data);
  }

  public Login(data: any):Observable<AuthResponse> {
    return this.http.post<AuthResponse>(this.url + "login", data);
  }

}
