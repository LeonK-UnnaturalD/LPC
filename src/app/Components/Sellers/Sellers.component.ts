import { Component, OnInit, ViewChild, Input } from '@angular/core';
import { SellersService } from 'src/app/Services/Sellers.service';
import Seller from '../../Classes/Seller';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import Offer from 'src/app/Classes/Offer';

@Component({
  selector: 'app-Sellers',
  templateUrl: './Sellers.component.html',
  styleUrls: ['./Sellers.component.css']
})
export class SellersComponent implements OnInit {
  public Sellers: MatTableDataSource<Offer> = new MatTableDataSource<Offer>();
  public displayedColumns: string[] = [
    "username",
    "deposit",
    "price",
    "sell"
  ]

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @Input() public HasOptions: boolean = false;

  constructor(private SellerService: SellersService) {
    
  }

  ngOnInit() {
    this.InitSellers();
  }

  public async InitSellers():Promise<void> {
    const sellersReq = this.SellerService.GetSellers();

    await this.SellerService.Error.HandleResult(sellersReq, (sellers) => {
      this.Sellers = new MatTableDataSource<Offer>(sellers);
      if(this.HasOptions)
        this.Sellers.paginator = this.paginator;
    }, (err) => {
      console.log(err);
    });
  }

  public Open(Id: string):void {
    window.location.assign(`/sell/${Id}`);
  }

}
