import { Injectable } from '@angular/core';
import Seller from '../Classes/Seller';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class SellersService {
  private url: string = "https://findpinearyou.herokuapp.com/api/";

  constructor(private http: HttpClient) {
    
  }

  public GetSellers():Observable<Array<Seller>> {
    return this.http.get<Array<Seller>>(this.url + "sellers");
  }

}
