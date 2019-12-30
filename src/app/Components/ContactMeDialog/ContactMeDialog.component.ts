import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import Offer from 'src/app/Classes/Offer';
import { BuyersService } from 'src/app/Services/Buyers.service';
import Message from 'src/app/Classes/Messages';
import { StorageService } from 'src/app/Services/Storage.service';
import { FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-ContactMeDialog',
  templateUrl: './ContactMeDialog.component.html',
  styleUrls: ['./ContactMeDialog.component.css']
})
export class ContactMeDialogComponent implements OnInit {
  public Amount: FormControl = new FormControl(this.Data.Limit, {
    validators: [Validators.required, Validators.max(this.Data.Limit), Validators.min(0)]
  });

  constructor(
    private DialogRef: MatDialogRef<ContactMeDialogComponent>,
    @Inject(MAT_DIALOG_DATA) private Data: Offer,
    private OfferService: BuyersService,
    private Storage: StorageService,
  ) { }

  ngOnInit() {
    
  }

  public CreateContact():void {
    if(this.Amount.invalid) return;

    const offerReq = this.OfferService.GetOffer(this.Data.Id);
    const customer = this.Storage.GetCustomer();

    this.OfferService.Error.HandleResult(offerReq, (offer) => {
      const option = { 
        UserId: offer.UserId, 
        Messages: [
          new Message(
            customer.User.Id,
            customer.User.Username,
            `${customer.User.Username} is requesting ${this.Amount.value} Pi from you`,
            new Date().toISOString(),
            true
          )
        ]
      };

      const reqContact = this.OfferService.CreateContact(option);
        
      this.OfferService.Error.HandleResult(reqContact, (contact) => {
        window.location.assign(`/chats/${contact.Id}`);
      }, (err) => {
        console.log(err);
      });
    }, (err) => {
      console.log(err);
    });
  }

}
