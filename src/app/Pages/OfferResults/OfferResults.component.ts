import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import Offer from 'src/app/Classes/Offer';
import { UserService } from 'src/app/Services/User.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MetaService } from 'src/app/Services/Meta.service';

@Component({
  selector: 'app-OfferResults',
  templateUrl: './OfferResults.component.html',
  styleUrls: ['./OfferResults.component.css']
})
export class OfferResultsComponent implements OnInit {
  public Buy: boolean = true;
  
  public From: string;
  public To: string;
  public Country: string;
  public City: string;
  public Loading: boolean = true;

  public Results: MatTableDataSource<Offer> = new MatTableDataSource<Offer>();
  public displayedColumns: string[] = [
    "username",
    "deposit",
    "price",
    "select"
  ]

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;

  constructor(
    private Route: ActivatedRoute, 
    private UserService: UserService,
    private Meta: MetaService
    ) { }

  ngOnInit() {
    this.Buy = this.Route.snapshot.queryParamMap.get('isbuying') === "true" ? true : false;
    this.From = this.Route.snapshot.queryParamMap.get('from');
    this.To = this.Route.snapshot.queryParamMap.get('to');
    this.Country = this.Route.snapshot.queryParamMap.get('country');
    this.City = this.Route.snapshot.queryParamMap.get('city');
    const currency = this.Route.snapshot.queryParamMap.get('currency');

    this.Meta.UpdateTitle(`LocalPicoins | Offers search result`);
    this.Meta.UpdateTag("description", "Lists the offers, which fits your search tags");

    this.InitOffer(currency);
  }

  private async InitOffer(currency: string):Promise<void> {
    const offersReq = this.UserService.FindOffers(this.Buy, this.From, this.To, this.Country, this.City, currency);

    await this.UserService.Error.HandleResult(offersReq, (offers) => {
      this.Results = new MatTableDataSource<Offer>(offers);
      this.Results.paginator = this.paginator;
      this.Loading = false;
    }, (err) => {
      console.error(err);
    });
  }

  public Open(Id: string):void {
    if(this.Buy)
    {
      window.location.assign(`/sell/${Id}`);
    }
    else
    {
      window.location.assign(`/buy/${Id}`);
    }
  }

}
