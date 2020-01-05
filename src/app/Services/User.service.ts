import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import AuthResponse from '../Classes/AuthResponse';
import User from '../Classes/User';
import Offer from '../Classes/Offer';
import { ErrorService } from './Error.service';
import DashboardResult from '../Classes/DashboardResponse';
import Comment from '../Classes/Comment';
import { StorageService } from './Storage.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private url: string = "https://findpinearyou.herokuapp.com/api/";
  private token: string;
  private user: { Id: string, Username: string };

  constructor(private http: HttpClient, public Error: ErrorService, private Storage: StorageService) {
    const props = this.Storage.GetCustomer();

    if(!props) return;

    const { Token, User } = props;

    this.token = Token;
    this.user = User;
  }

  public GetProfile():Promise<User> {
    const headers = new HttpHeaders().set("Authorization", `Bearer ${this.token}`);
    return this.http.get<User>(this.url + `profile/${this.user.Id}`, { headers: headers }).toPromise();
  }

  public FindMembers(searchString: string):Promise<{ Id: string, Username: string }[]> {
    const headers = new HttpHeaders().set("Authorization", `Bearer ${this.token}`);
    return this.http.post<{ Id: string, Username: string }[]>(this.url + `get_users`, { search: searchString }, { headers: headers }).toPromise();
  }

  public CreateOffer(data: any):Promise<Offer> {
    const headers = new HttpHeaders().set("Authorization", `Bearer ${this.token}`);
    return this.http.post<Offer>(this.url + `offer`, data, { headers: headers }).toPromise();
  }

  public GetUser(Id: string):Promise<User> {
    return this.http.get<User>(this.url + `users/${Id}`).toPromise();
  }

  public FindOffers(buy: boolean, from: string, to: string, country: string, city: string, currency: string):Promise<Array<Offer>> {
    return this.http.get<Array<Offer>>(this.url + `offers/?buy=${buy}&from=${from}&to=${to}&country=${country}&currency=${currency}&city=${city}`).toPromise();
  }

  public ChangeProfile(data: any):Promise<User> {
    const headers = new HttpHeaders().set("Authorization", `Bearer ${this.token}`);
    return this.http.post<User>(this.url + "profile", data, { headers: headers }).toPromise();
  }

  public VerifyEmail(Id: string):Promise<string> {
    return this.http.get<string>(this.url + "verify_email/" + Id).toPromise();
  }

  public GetDashboard():Promise<DashboardResult> {
    const headers = new HttpHeaders().set("Authorization", `Bearer ${this.token}`);
    return this.http.get<DashboardResult>(this.url + "dashboard", { headers: headers }).toPromise();
  }

  public EditOffer(data: any):Promise<Offer> {
    const headers = new HttpHeaders().set("Authorization", `Bearer ${this.token}`);
    return this.http.post<Offer>(this.url + "edit_offer", data, { headers: headers }).toPromise();
  }

  public DeleteOffer(data: any):Promise<void> {
    const headers = new HttpHeaders().set("Authorization", `Bearer ${this.token}`);
    return this.http.post<void>(this.url + "delete_offer", data, { headers: headers }).toPromise();
  }

  public Accept(data: any):Promise<void> {
    const headers = new HttpHeaders().set("Authorization", `Bearer ${this.token}`);
    return this.http.post<void>(this.url + "accept_review", data, { headers: headers }).toPromise();
  }

  public Deny(data: any):Promise<void> {
    const headers = new HttpHeaders().set("Authorization", `Bearer ${this.token}`);
    return this.http.post<void>(this.url + "deny_review", data, { headers: headers }).toPromise();
  }

  public CreateReview(data: any):Promise<Comment> {
    const headers = new HttpHeaders().set("Authorization", `Bearer ${this.token}`);
    return this.http.post<Comment>(this.url + "create_review", data, { headers: headers }).toPromise();
  }

  public SetStatus(date: number):Promise<void> {
    return this.http.post<void>(this.url + "/set_status", { date }, { headers: new HttpHeaders().append("Authorization", `Bearer ${this.token}`) }).toPromise();
  }

}
