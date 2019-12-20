import { Component, OnInit, Input } from '@angular/core';
import { BuyersService } from 'src/app/Services/Buyers.service';
import { ActivatedRoute } from '@angular/router';
import Offer from 'src/app/Classes/Offer';
import feather from 'feather-icons';
import { FormBuilder, FormGroup } from '@angular/forms';
import Message from 'src/app/Classes/Messages';
import User from 'src/app/Classes/User';
import AuthResponse from 'src/app/Classes/AuthResponse';
import { Observable, of } from 'rxjs';
import { StorageService } from 'src/app/Services/Storage.service';

@Component({
  selector: 'app-BuyOffer',
  templateUrl: './BuyOffer.component.html',
  styleUrls: ['./BuyOffer.component.css']
})
export class BuyOfferComponent implements OnInit {
  public Offer: Offer;
  public Group: FormGroup = null;
  public Opened: boolean = false;
  public AmountOfPi: number = 1;
  public Id: string;
  public Error: { Code: number, Msg: string } = null;
  public Loading: boolean = true;
  public Profile: { Id: string, Username: string };

  constructor(private OfferService: BuyersService, private Storage: StorageService, private Site: ActivatedRoute, private Form: FormBuilder) { }

  ngOnInit() {
    this.Group = this.Form.group({
      Amount: 1
    });

    this.Id = this.Site.snapshot.paramMap.get("id");
    const profile = this.Storage.GetCustomer();

    if(profile)
      this.Profile = profile.User;

    this.InitOffer();

    setTimeout(() => feather.replace(), 200);
  }

  private async InitOffer():Promise<void> {
    const offerReq = this.OfferService.GetOffer(this.Id);

    await this.OfferService.Error.HandleResult(offerReq, (offer) => {
      console.log(offer);
      this.Offer = offer;
      this.Loading = false;
    }, err => {
      this.Error = err;
    });
  }

  public OpenForm():void {
    this.Opened = !this.Opened;
  }

  public MoneyToPi(data: any):void {
    this.AmountOfPi = parseFloat(data.target.value);
    this.Group.value.Amount = this.AmountOfPi;
  }

  public Close():void {
    this.Opened = false;
  }

  public CreateContact(data: any):void {
    const offerReq = this.OfferService.GetOffer(this.Id);

    this.OfferService.Error.HandleResult(offerReq, (offer) => {
      const option = { 
        UserId: offer.UserId, 
        Messages: [
          new Message(
            this.Profile.Id,
            this.Profile.Username,
            `${this.Profile.Username} is requesting ${data.Amount} Pi from you`,
            new Date().toISOString(),
            true
          )
        ]
      };

      const reqContact = this.OfferService.CreateContact(option);
        
      this.OfferService.Error.HandleResult(reqContact, (contact) => {
        window.location.assign(`/chats/${contact.Id}`);
      }, (err) => {
        this.Error = err;
      })
    }, (err) => {
      this.Error = err;
    });
  }
}
