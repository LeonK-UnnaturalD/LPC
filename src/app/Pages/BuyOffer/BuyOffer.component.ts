import { Component, OnInit, Input } from '@angular/core';
import { BuyersService } from 'src/app/Services/Buyers.service';
import { ActivatedRoute } from '@angular/router';
import Offer from 'src/app/Classes/Offer';
import feather from 'feather-icons';
import { FormBuilder, FormGroup } from '@angular/forms';
import Message from 'src/app/Classes/Messages';
import User from 'src/app/Classes/User';
import AuthResponse from 'src/app/Classes/AuthResponse';
import { Observable, of } from 'rxjs';
import { StorageService } from 'src/app/Services/Storage.service';
import { MatDialog } from '@angular/material/dialog';
import { ContactMeDialogComponent } from 'src/app/Components/ContactMeDialog/ContactMeDialog.component';

@Component({
  selector: 'app-BuyOffer',
  templateUrl: './BuyOffer.component.html',
  styleUrls: ['./BuyOffer.component.css']
})
export class BuyOfferComponent implements OnInit {
  public Offer: Offer;
  public Group: FormGroup = null;
  public Opened: boolean = false;
  public AmountOfPi: number = 1;
  public Id: string;
  public Error: { Code: number, Msg: string } = null;
  public Loading: boolean = true;
  public Profile: { Id: string, Username: string };

  constructor(private OfferService: BuyersService, private Storage: StorageService, private Site: ActivatedRoute, private Form: FormBuilder, private Dialog: MatDialog) { }

  ngOnInit() {
    this.Group = this.Form.group({
      Amount: 1
    });

    this.Id = this.Site.snapshot.paramMap.get("id");
    const profile = this.Storage.GetCustomer();

    if(profile)
      this.Profile = profile.User;

    this.InitOffer();

    setTimeout(() => feather.replace(), 200);
  }

  private async InitOffer():Promise<void> {
    const offerReq = this.OfferService.GetOffer(this.Id);

    await this.OfferService.Error.HandleResult(offerReq, (offer) => {
      this.Offer = offer;
      this.Loading = false;
    }, err => {
      this.Error = err;
    });
  }

  public OpenDialog():void {
    this.Dialog.open(ContactMeDialogComponent, {
      minWidth: "250px",
      data: this.Offer
    });
  }

  public OpenUser(Id: string):void {
    window.location.assign(`/user/${Id}`);
  }
}
