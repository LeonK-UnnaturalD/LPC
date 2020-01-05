import { Component, OnInit } from '@angular/core';
import { MetaService } from 'src/app/Services/Meta.service';

@Component({
  selector: 'app-Sell',
  templateUrl: './Sell.component.html',
  styleUrls: ['./Sell.component.css']
})
export class SellComponent implements OnInit {

  constructor(private Meta: MetaService) { }

  ngOnInit() {
    this.Meta.UpdateTitle(`LocalPicoins | Sell Pi`);
    this.Meta.UpdateTag("description", "Check all offers, so you can decide to which one you could sell some Pi to.");
  }

}
