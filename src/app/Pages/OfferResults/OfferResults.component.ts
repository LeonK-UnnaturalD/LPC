import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import Offer from 'src/app/Classes/Offer';
import { UserService } from 'src/app/Services/User.service';

@Component({
  selector: 'app-OfferResults',
  templateUrl: './OfferResults.component.html',
  styleUrls: ['./OfferResults.component.css']
})
export class OfferResultsComponent implements OnInit {
  public Buy: boolean = true;
  public Offers: Observable<Array<Offer>>;
  public From: string;
  public To: string;
  public Country: string;

  constructor(private Route: ActivatedRoute, private UserService: UserService) { }

  ngOnInit() {
    this.Buy = this.Route.snapshot.queryParamMap.get('isbuying') === "true" ? true : false;
    this.From = this.Route.snapshot.queryParamMap.get('from');
    this.To = this.Route.snapshot.queryParamMap.get('to');
    this.Country = this.Route.snapshot.queryParamMap.get('country');
    const currency = this.Route.snapshot.queryParamMap.get('currency');

    this.Offers = this.UserService.FindOffers(this.Buy, this.From, this.To, this.Country, currency);
  }

}
