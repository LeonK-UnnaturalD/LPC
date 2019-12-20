import { Component, OnInit } from '@angular/core';
import { BuyersService } from 'src/app/Services/Buyers.service';
import Buyer from 'src/app/Classes/Buyer';
import { ActivatedRoute } from '@angular/router';
import Offer from 'src/app/Classes/Offer';

@Component({
  selector: 'app-BuyPi',
  templateUrl: './BuyPi.component.html',
  styleUrls: ['./BuyPi.component.css']
})
export class BuyPiComponent implements OnInit {
  public State: string = "United states";
  public Buyers: Array<Offer> = new Array<Offer>();

  constructor(private BuyService: BuyersService, private Route: ActivatedRoute) {
    
  }

  ngOnInit() {
    this.InitBuyers();
  }

  public async InitBuyers():Promise<void> {
    const res = this.BuyService.GetBuyers();
    
    this.BuyService.Error.HandleResult(res, (data) => this.Buyers = data, (err) => console.log(err));
  } 

}
