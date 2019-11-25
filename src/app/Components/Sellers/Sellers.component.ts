import { Component, OnInit } from '@angular/core';
import { SellersService } from 'src/app/Services/Sellers.service';
import Seller from '../../Classes/Seller';

@Component({
  selector: 'app-Sellers',
  templateUrl: './Sellers.component.html',
  styleUrls: ['./Sellers.component.css']
})
export class SellersComponent implements OnInit {
  public Sellers: Array<Seller> = new Array<Seller>();
  public State: string = "United states";

  constructor(private SellerService: SellersService) {
    //this.SellerService.GetSellers();
  }

  ngOnInit() {
  }

}
