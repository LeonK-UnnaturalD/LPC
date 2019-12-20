import { Injectable } from '@angular/core';
import Seller from '../Classes/Seller';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import Offer from '../Classes/Offer';
import { ErrorService } from './Error.service';

@Injectable({
  providedIn: 'root'
})
export class SellersService {
  private url: string = "https://findpinearyou.herokuapp.com/api/";

  constructor(private http: HttpClient, public Error: ErrorService) {
    
  }

  public GetSellers():Promise<Array<Offer>> {
    return this.http.get<Array<Offer>>(this.url + "sellers").toPromise();
  }

}
