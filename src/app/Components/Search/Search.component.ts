import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/Services/User.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { GetCitiesService } from 'src/app/Services/GetCities.service';

@Component({
  selector: 'app-Search',
  templateUrl: './Search.component.html',
  styleUrls: ['./Search.component.css']
})
export class SearchComponent implements OnInit {
  public IsBuying: boolean = true;
  public Group: FormGroup;
  public Cities: Array<string> = new Array<string>();

  constructor(private Router: Router, private Form: FormBuilder, private CityService: GetCitiesService) { }

  ngOnInit() {
    this.Group = this.Form.group({
      From: 0,
      To: 0,
      Currency: "USD",
      Country: "GB",
      City: ""
    }, 
    {
      "validators": [ Validators.required ]
    });
  }

  public SetToBuy():void {
    this.IsBuying = true;
  }

  public Find(data: any):void {
    if(this.Group.invalid) return;

    this.Router.navigate(["/offer_results"], { queryParams: { isbuying: this.IsBuying, from: data.From, to: data.To, country: data.Country, currency: data.Currency, city: data.City } });
  }

  public SetToSell():void {
    this.IsBuying = false;
  }

  public OnChange(value: string):void {
    this.CityService.GetCities(value, (cities) => {
      this.Cities = cities;

      this.Group.setValue({
        From: this.Group.value.From,
        To: this.Group.value.To,
        Currency: this.Group.value.Currency,
        Country: this.Group.value.Country,
        City: cities[0]
      });
    }, (err) => {
      console.log(err);
    });
  }

}
