import { Component, OnInit, Input } from '@angular/core';
import { BuyersService } from 'src/app/Services/Buyers.service';
import { ActivatedRoute } from '@angular/router';
import Offer from 'src/app/Classes/Offer';
import feather from 'feather-icons';
import { FormBuilder, FormGroup } from '@angular/forms';
import Message from 'src/app/Classes/Messages';
import User from 'src/app/Classes/User';
import AuthResponse from 'src/app/Classes/AuthResponse';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-BuyOffer',
  templateUrl: './BuyOffer.component.html',
  styleUrls: ['./BuyOffer.component.css']
})
export class BuyOfferComponent implements OnInit {
  public Offer: Observable<Offer>;
  public Group: FormGroup = null;
  public Opened: boolean = false;
  public AmountOfPi: number = 1;

  public Me: User = null;

  constructor(private OfferService: BuyersService, private Site: ActivatedRoute, private Form: FormBuilder) { }

  ngOnInit() {
    this.Me = localStorage.getItem("User") ? (<AuthResponse>JSON.parse(localStorage.getItem("User"))).User : null;

    this.Group = this.Form.group({
      Amount: 1
    });

    const offerId = this.Site.snapshot.paramMap.get("id");
    this.Offer = this.OfferService.GetOffer(offerId);

    feather.replace();
  }

  public OpenForm():void {
    this.Opened = !this.Opened;
  }

  public MoneyToPi(data: any):void {
    this.AmountOfPi = parseFloat(data.target.value);
  }

  public CreateContact(data: any):void {
    const option = { 
      UserId: this.Me.Id, 
      Messages: [
        new Message(
          this.Me.Id,
          this.Me.Username,
          `${this.Me.Username} is requesting ${data.Amount} Pi from you`,
          new Date().toISOString(),
          true
        )
      ]
    };

    this.OfferService.CreateContact(option).subscribe(c => {
      console.log(c);
    });
  }

}
