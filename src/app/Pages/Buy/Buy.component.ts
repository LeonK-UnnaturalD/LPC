import { Component, OnInit } from '@angular/core';
import { MetaService } from 'src/app/Services/Meta.service';

@Component({
  selector: 'app-Buy',
  templateUrl: './Buy.component.html',
  styleUrls: ['./Buy.component.css']
})
export class BuyComponent implements OnInit {

  constructor(private Meta: MetaService) { }

  ngOnInit() {
    this.Meta.UpdateTitle("LocalPicoins | Buy Pi");
    this.Meta.UpdateTag("description", "Check all offers, which you could buy");
  }

}
