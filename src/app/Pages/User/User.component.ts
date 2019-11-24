import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import User from 'src/app/Classes/User';
import { BuyersService } from 'src/app/Services/Buyers.service';
import feather from 'feather-icons';

@Component({
  selector: 'app-User',
  templateUrl: './User.component.html',
  styleUrls: ['./User.component.css']
})
export class UserComponent implements OnInit {
  public Id: string = null;
  public User: User = null;

  constructor(private Route: ActivatedRoute, private Buyers: BuyersService) {
    this.Id = this.Route.snapshot.paramMap.get('id');
    this.User = this.Buyers.GetBuyerUserViaOfferId(this.Id);
  }

  ngOnInit() {
    setTimeout(() => feather.replace(), 100);
  }

}
