import { Injectable } from '@angular/core';
import Buyer from '../Classes/Buyer';
import Offer from '../Classes/Offer';
import User from '../Classes/User';
import { Observable } from 'rxjs';
import Chat from '../Classes/Chats';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import AuthResponse from '../Classes/AuthResponse';
import { ErrorService } from './Error.service';

@Injectable({
  providedIn: 'root'
})
export class BuyersService {
  private url: string = "https://findpinearyou.herokuapp.com/api/";
  private Res: AuthResponse = null;

  constructor(private http: HttpClient, public Error: ErrorService) {
    this.Res = <AuthResponse>JSON.parse(localStorage.getItem("User"));
  }

  public GetBuyers():Observable<Array<Offer>> {
    return this.http.get<Array<Offer>>(this.url + "buyers");
  }
  
  public GetOffer(Id: string):Observable<Offer> {
    return this.http.get<Offer>(this.url + `offers/${Id}`);
  }

  public CreateContact(data: any):Observable<Chat> {
    const headers = new HttpHeaders().set("Authorization", `Bearer ${this.Res.Token}`);

    return this.http.post<Chat>(this.url + "createcontact", data, { headers: headers });
  }

}
