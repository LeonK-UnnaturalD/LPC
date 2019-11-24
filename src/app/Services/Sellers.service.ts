import { Injectable } from '@angular/core';
import Seller from '../Classes/Seller';

@Injectable({
  providedIn: 'root'
})
export class SellersService {
  public Sellers: Array<Seller> = new Array<Seller>();

  constructor() {
    this.Sellers = 
    [
      { Name: "Steve", OfferId: "0", PaymentMethod: "Cash deposit", Price: 10},
      { Name: "Leon", OfferId: "1", PaymentMethod: "Cash deposit", Price: 15},
      { Name: "Kris", OfferId: "2", PaymentMethod: "Cash deposit", Price: 12},
      { Name: "Stephen", OfferId: "3", PaymentMethod: "Cash deposit", Price: 15},
      { Name: "Jason", OfferId: "4", PaymentMethod: "Cash deposit", Price: 8}
    ]
  }

  public GetSellers():Array<Seller> {
    return this.Sellers;
  }

}
