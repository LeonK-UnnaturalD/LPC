import { Component, OnInit } from '@angular/core';
import { SellersService } from 'src/app/Services/Sellers.service';
import Seller from '../../Classes/Seller';
import Offer from 'src/app/Classes/Offer';

@Component({
  selector: 'app-Sellers',
  templateUrl: './Sellers.component.html',
  styleUrls: ['./Sellers.component.css']
})
export class SellersComponent implements OnInit {
  public Sellers: Array<Offer> = new Array<Offer>();
  public State: string = "United states";

  constructor(private SellerService: SellersService) {
    
  }

  ngOnInit() {
    this.SellerService.GetSellers().subscribe(s => {
      this.Sellers = s;
    });
  }

}
