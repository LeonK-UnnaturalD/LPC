import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/Services/User.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-Search',
  templateUrl: './Search.component.html',
  styleUrls: ['./Search.component.css']
})
export class SearchComponent implements OnInit {
  public IsBuying: boolean = true;
  public Group: FormGroup;

  constructor(private Router: Router, private Form: FormBuilder) { }

  ngOnInit() {
    this.Group = this.Form.group({
      From: 0,
      To: 0,
      Currency: "USD",
      Country: "United Kingdom"
    });
  }

  public SetToBuy():void {
    this.IsBuying = true;
  }

  public Find(data: any):void {
    this.Router.navigate(["/offer_results"], { queryParams: { isbuying: this.IsBuying, from: data.From, to: data.To, country: data.Country, currency: data.Currency } });
  }

  public SetToSell():void {
    this.IsBuying = false;
  }

}
