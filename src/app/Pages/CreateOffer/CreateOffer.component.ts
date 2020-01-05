import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { UserService } from 'src/app/Services/User.service';
import { GetCitiesService } from 'src/app/Services/GetCities.service';
import User from 'src/app/Classes/User';
import { StorageService } from 'src/app/Services/Storage.service';
import { MetaService } from 'src/app/Services/Meta.service';

@Component({
  selector: 'app-CreateOffer',
  templateUrl: './CreateOffer.component.html',
  styleUrls: ['./CreateOffer.component.css']
})
export class CreateOfferComponent implements OnInit {
  public Buying: boolean = false;
  public Group: FormGroup = null;
  public Error: { Code: number, Msg: string } = null;
  public Success: boolean = false;
  public Cities: Array<string> = new Array<string>();
  public Yourself: User;
  public Loading: boolean = true;

  constructor(
    private CityService: GetCitiesService, 
    private Form: FormBuilder, 
    private User: UserService,
    private Storage: StorageService,
    private Meta: MetaService
    ) { }

  ngOnInit() {
    this.Group = this.Form.group({
      Limit: "",
      Price: "",
      Deposit: "Cash deposit",
      Currency: "USD",
      Country: "GB",
      City: "",
    });

    this.InitUser();
  }

  private async InitUser():Promise<void> {
    const userReq = this.User.GetUser(this.Storage.GetCustomer().User.Id);

    await this.User.Error.HandleResult(userReq, (user) => {
      this.Yourself = user;
      this.Loading = false;
    }, (err) => {
      console.log(err);
    });
  }

  public Sell():void {
    this.Buying = false;
  }

  public Buy():void {
    this.Buying = true;
  }

  public async CreateOffer(data: any):Promise<void> {
    data["IsBuying"] = this.Buying;

    const createReq = this.User.CreateOffer(data);

    this.User.Error.HandleResult(createReq, (offer) => {
      this.Meta.UpdateTitle(`LocalPicoins | Post offer`);
      this.Meta.UpdateTag("description", "Create an offer, so other clients can buy Pi from you or sell Pi to you");
    }, (err) => {
      this.Error = err;
    })

    this.Success = true;
    this.Group.reset();
  }

  public Close(data: any):void {
    this.Error = null;
  }

  public OnChange(value: string):void {
    this.CityService.GetCities(value, (cities) => {
      this.Cities = cities;

      this.Group.setValue({
        Limit: this.Group.value.Limit,
        Price: this.Group.value.Price,
        Deposit: this.Group.value.Deposit,
        Currency: this.Group.value.Currency,
        Country: this.Group.value.Country,
        City: cities[0]
      });
    }, (err) => {
      console.error(err);
    });
  }

}
