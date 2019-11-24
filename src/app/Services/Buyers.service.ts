import { Injectable } from '@angular/core';
import { Buyer, Offer } from '../Classes/Buyer';
import User from '../Classes/User';

@Injectable({
  providedIn: 'root'
})
export class BuyersService {
  public Buyers: Array<Buyer> = new Array<Buyer>();
  public Users: Array<User> = new Array<User>();
  public BuyOffers: Array<Offer> = new Array<Offer>();

  constructor() {
    this.Buyers = 
    [
      { Name: "Steve", OfferId: "0", PaymentMethod: "Cash deposit", Price: 10, Description: "Easy and fast service for the whole family"},
      { Name: "Leon", OfferId: "1", PaymentMethod: "Cash deposit", Price: 15},
      { Name: "Kris", OfferId: "2", PaymentMethod: "Cash deposit", Price: 12},
      { Name: "Stephen", OfferId: "3", PaymentMethod: "Cash deposit", Price: 15},
      { Name: "Jason", OfferId: "4", PaymentMethod: "Cash deposit", Price: 8}
    ];

    this.Users = [
      { 
        Username: "Leon", 
        Id: "1", 
        Description: "Selling easy and fast", 
        Comments: [
          { UserId: "0", Username: "Steve", Text: "Took way too long", Rating: "bad" },
          { UserId: "1", Username: "Leon", Text: "Cooperative and easy", Rating: "good" }
        ], 
        CreatedAt: new Date().toISOString(), 
        Languages: ["English, German"],
        ConfirmedTrades: ["0", "1"],
        FeedbackScore: 100,
        Trust: ["1", "2"],
        SellOffers: ["1"],
        Terms: "Contact me and then go wild" }
    ];

    this.BuyOffers = [
      {Username: "Leon", Location: "Germany", PaymentMethod: "Cash deposit", Price: 15, User: this.Users[0], Id: "1"}
    ]
  }

  public GetBuyers():Array<Buyer> {
    return this.Buyers;
  }

  public GetBuyerUserViaOfferId(OfferId: string):User {
    return this.Users.find(u => u.SellOffers.includes(OfferId));
  }

  public GetOffer(OfferId: string):Offer {
    return this.BuyOffers.find(o => o.Id === OfferId);
  }

}
