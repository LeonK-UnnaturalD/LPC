import { Component, OnInit } from '@angular/core';
import { BuyersService } from 'src/app/Services/Buyers.service';
import { Buyer } from 'src/app/Classes/Buyer';

@Component({
  selector: 'app-BuyPi',
  templateUrl: './BuyPi.component.html',
  styleUrls: ['./BuyPi.component.css']
})
export class BuyPiComponent implements OnInit {
  public State: string = "United states";
  public Buyers: Array<Buyer> = new Array<Buyer>();

  constructor(private BuyService: BuyersService) {
    this.Buyers = this.BuyService.GetBuyers();
  }

  ngOnInit() {
  }

}
