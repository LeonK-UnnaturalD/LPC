import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import AuthResponse from '../Classes/AuthResponse';
import User from '../Classes/User';
import Offer from '../Classes/Offer';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private url: string = "https://findpinearyou.herokuapp.com/api/";
  private Res: AuthResponse = null;

  constructor(private http: HttpClient) {
    this.Res = <AuthResponse>JSON.parse(localStorage.getItem("User"));
  }

  public GetProfile():Observable<User> {
    const headers = new HttpHeaders().set("Authorization", `Bearer ${this.Res.Token}`);

    return this.http.get<User>(this.url + `profile/${this.Res.User.Id}`, { headers: headers });
  }

  public CreateOffer(data: any):Observable<Offer> {
    const headers = new HttpHeaders().set("Authorization", `Bearer ${this.Res.Token}`);

    return this.http.post<Offer>(this.url + `offer`, data, { headers: headers });
  }

}
