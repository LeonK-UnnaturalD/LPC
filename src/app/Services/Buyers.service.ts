import { Injectable } from '@angular/core';
import Buyer from '../Classes/Buyer';
import Offer from '../Classes/Offer';
import User from '../Classes/User';
import { Observable } from 'rxjs';
import Chat from '../Classes/Chats';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import AuthResponse from '../Classes/AuthResponse';
import { ErrorService } from './Error.service';
import { StorageService } from './Storage.service';
import { async } from '@angular/core/testing';

@Injectable({
  providedIn: 'root'
})
export class BuyersService {
  private url: string = "https://findpinearyou.herokuapp.com/api/";
  private token: string;

  constructor(private http: HttpClient, public Error: ErrorService, private Storage: StorageService) {
    const props = this.Storage.GetCustomer();

    if(!props) return;

    this.token = props.Token;
  }

  public GetBuyers():Promise<any> {
    return this.http.get<Array<Offer>>(this.url + "buyers").toPromise();
  }
  
  public GetOffer(Id: string):Promise<Offer> {
    return this.http.get<Offer>(this.url + `offers/${Id}`).toPromise();
  }

  public async CreateContact(data: any):Promise<Chat> {
    data["CustomerId"] = this.Storage.GetCustomer().User.Id;

    const headers = new HttpHeaders().set("Authorization", `Bearer ${this.token}`);
    return this.http.post<Chat>(this.url + "createcontact", data, { headers: headers }).toPromise();
  }

}
