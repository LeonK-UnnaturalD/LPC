import { Injectable } from '@angular/core';
import Buyer from '../Classes/Buyer';
import Offer from '../Classes/Offer';
import User from '../Classes/User';
import { Observable } from 'rxjs';
import Chat from '../Classes/Chats';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import AuthResponse from '../Classes/AuthResponse';

@Injectable({
  providedIn: 'root'
})
export class BuyersService {
  public Buyers: Array<Buyer> = new Array<Buyer>();
  public Users: Array<User> = new Array<User>();
  public BuyOffers: Array<Offer> = new Array<Offer>();
  private url: string = "https://findpinearyou.herokuapp.com/api/";
  private Res: AuthResponse = null;

  constructor(private http: HttpClient) {
    this.Res = <AuthResponse>JSON.parse(localStorage.getItem("User"));
  }

  public GetBuyers():Observable<Array<Buyer>> {
    return this.http.get<Array<Buyer>>(this.url + "buyers");
  }

  public GetBuyerUserViaOfferId(OfferId: string):User {
    return this.Users.find(u => u.Offers.includes(OfferId));
  }

  public GetOffer(OfferId: string):Offer {
    return this.BuyOffers.find(o => o.Id === OfferId);
  }

  public CreateContact(data: any):Observable<Chat> {
    const headers = new HttpHeaders().set("Authorization", `Bearer ${this.Res.Token}`);

    return this.http.post<Chat>(this.url + "createcontact", data, { headers: headers });
  } 

}
