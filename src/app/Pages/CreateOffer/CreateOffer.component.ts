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

  constructor(private Form: FormBuilder, private User: UserService) { }

  ngOnInit() {
    this.Group = this.Form.group({
      Limit: "",
      Price: "",
      Deposit: ""
    })
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
      console.log(offer);

      this.Group.reset();
    });
  }

}
