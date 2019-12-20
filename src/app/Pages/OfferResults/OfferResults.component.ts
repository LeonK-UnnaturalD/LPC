import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import Offer from 'src/app/Classes/Offer';
import { UserService } from 'src/app/Services/User.service';

@Component({
  selector: 'app-OfferResults',
  templateUrl: './OfferResults.component.html',
  styleUrls: ['./OfferResults.component.css']
})
export class OfferResultsComponent implements OnInit {
  public Buy: boolean = true;
  public Offers: Array<Offer>;
  public From: string;
  public To: string;
  public Country: string;
  public City: string;
  public Loading: boolean = true;

  constructor(private Route: ActivatedRoute, private UserService: UserService) { }

  ngOnInit() {
    this.Buy = this.Route.snapshot.queryParamMap.get('isbuying') === "true" ? true : false;
    this.From = this.Route.snapshot.queryParamMap.get('from');
    this.To = this.Route.snapshot.queryParamMap.get('to');
    this.Country = this.Route.snapshot.queryParamMap.get('country');
    this.City = this.Route.snapshot.queryParamMap.get('city');
    const currency = this.Route.snapshot.queryParamMap.get('currency');

    this.InitOffer(currency);
  }

  private async InitOffer(currency: string):Promise<void> {
    const offersReq = this.UserService.FindOffers(this.Buy, this.From, this.To, this.Country, this.City, currency);

    await this.UserService.Error.HandleResult(offersReq, (offers) => {
      this.Offers = <Offer[]>offers;
      this.Loading = false;
    }, (err) => {
      console.error(err);
    });
  }

}
