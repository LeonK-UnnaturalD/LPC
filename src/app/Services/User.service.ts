import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import AuthResponse from '../Classes/AuthResponse';
import User from '../Classes/User';
import Offer from '../Classes/Offer';
import { ErrorService } from './Error.service';
import DashboardResult from '../Classes/DashboardResponse';
import Comment from '../Classes/Comment';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private url: string = "https://findpinearyou.herokuapp.com/api/";
  private Res: AuthResponse = null;

  constructor(private http: HttpClient, public Error: ErrorService) {
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

  public GetUser(Id: string):Observable<User> {
    return this.http.get<User>(this.url + `users/${Id}`);
  }

  public FindOffers(buy: boolean, from: string, to: string, country: string, currency: string):Observable<Array<Offer>> {
    return this.http.get<Array<Offer>>(this.url + `offers/?buy=${buy}&from=${from}&to=${to}&country=${country}&currency=${currency}`);
  }

  public ChangeProfile(data: any):Observable<User> {
    const headers = new HttpHeaders().set("Authorization", `Bearer ${this.Res.Token}`);

    return this.http.post<User>(this.url + "profile", data, { headers: headers });
  }

  public VerifyEmail(Id: string):Observable<string> {
    return this.http.get<string>(this.url + "verify_email/" + Id);
  }

  public GetDashboard():Observable<DashboardResult> {
    const headers = new HttpHeaders().set("Authorization", `Bearer ${this.Res.Token}`);

    return this.http.get<DashboardResult>(this.url + "dashboard", { headers: headers });
  }

  public EditOffer(data: any):Observable<Offer> {
    const headers = new HttpHeaders().set("Authorization", `Bearer ${this.Res.Token}`);

    return this.http.post<Offer>(this.url + "edit_offer", data, { headers: headers });
  }

  public DeleteOffer(data: any):Observable<void> {
    const headers = new HttpHeaders().set("Authorization", `Bearer ${this.Res.Token}`);

    return this.http.post<void>(this.url + "delete_offer", data, { headers: headers });
  }

  public Accept(data: any):Observable<void> {
    const headers = new HttpHeaders().set("Authorization", `Bearer ${this.Res.Token}`);

    return this.http.post<void>(this.url + "accept_review", data, { headers: headers });
  }

  public Deny(data: any):Observable<void> {
    const headers = new HttpHeaders().set("Authorization", `Bearer ${this.Res.Token}`);

    return this.http.post<void>(this.url + "deny_review", data, { headers: headers });
  }

  public CreateReview(data: any):Observable<Comment> {
    const headers = new HttpHeaders().set("Authorization", `Bearer ${this.Res.Token}`);

    return this.http.post<Comment>(this.url + "create_review", data, { headers: headers });
  }

}
