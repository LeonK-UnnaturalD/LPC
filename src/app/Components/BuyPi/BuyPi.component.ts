import { Component, OnInit, ViewChild } from '@angular/core';
import { BuyersService } from 'src/app/Services/Buyers.service';
import Buyer from 'src/app/Classes/Buyer';
import { ActivatedRoute } from '@angular/router';
import Offer from 'src/app/Classes/Offer';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';

@Component({
  selector: 'app-BuyPi',
  templateUrl: './BuyPi.component.html',
  styleUrls: ['./BuyPi.component.css']
})
export class BuyPiComponent implements OnInit {
  public Buyers: MatTableDataSource<Buyer[]> = new MatTableDataSource<Buyer[]>();
  public displayedColumns = [
    "username",
    "deposit",
    "price",
    "buy"
  ]

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;

  constructor(private BuyService: BuyersService, private Route: ActivatedRoute) {
    
  }

  ngOnInit() {
    this.InitBuyers();
  }

  public async InitBuyers():Promise<void> {
    const res = this.BuyService.GetBuyers();
    
    this.BuyService.Error.HandleResult(res, (data) => {
      this.Buyers = new MatTableDataSource<Buyer[]>(data);

      this.Buyers.paginator = this.paginator;
    }, (err) => console.log(err));
  }

  public Open(Id: string):void {
    window.location.assign(`/buy/${Id}`);
  }

}
