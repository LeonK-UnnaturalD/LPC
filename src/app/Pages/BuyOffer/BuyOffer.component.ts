import { Component, OnInit } from '@angular/core';
import { BuyersService } from 'src/app/Services/Buyers.service';
import { ActivatedRoute } from '@angular/router';
import { Offer } from 'src/app/Classes/Buyer';
import feather from 'feather-icons';

@Component({
  selector: 'app-BuyOffer',
  templateUrl: './BuyOffer.component.html',
  styleUrls: ['./BuyOffer.component.css']
})
export class BuyOfferComponent implements OnInit {
  public Id: string = "";
  public Offer: Offer = null;

  constructor(private OfferService: BuyersService, private Site: ActivatedRoute) {
    this.Id = this.Site.snapshot.paramMap.get("id");
    this.Offer = this.OfferService.GetOffer(this.Id);
  }

  ngOnInit() {
    feather.replace();
  }

}
