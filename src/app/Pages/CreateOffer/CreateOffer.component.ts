import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { UserService } from 'src/app/Services/User.service';

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

  constructor(private Form: FormBuilder, private User: UserService) { }

  ngOnInit() {
    this.Group = this.Form.group({
      Limit: "",
      Price: "",
      Deposit: "",
      Currency: "USD",
      Country: "United Kingdom"
    });
  }

  public Sell():void {
    this.Buying = false;
  }

  public Buy():void {
    this.Buying = true;
  }

  public CreateOffer(data: any):void {
    data["IsBuying"] = this.Buying;

    this.User.CreateOffer(data).subscribe(offer => {
      this.Success = true;

      this.Group.reset();
    }, err => {
      this.Error = this.User.Error.HandleError(err);
    });
  }

  public Close():void {
    this.Error = null;
  }

}
