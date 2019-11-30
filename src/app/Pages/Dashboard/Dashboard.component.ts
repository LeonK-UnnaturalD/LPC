import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/Services/User.service';
import DashboardResult from 'src/app/Classes/DashboardResponse';
import feather from 'feather-icons';
import Offer from 'src/app/Classes/Offer';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-Dashboard',
  templateUrl: './Dashboard.component.html',
  styleUrls: ['./Dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  public Loading: boolean = true;
  public Dashboard: DashboardResult;
  public Offer: Offer = new Offer();
  public Opened: boolean = false;
  public Group: FormGroup;
  public Error: { Code: number, Msg: string } = null;

  constructor(private UserService: UserService, private Form: FormBuilder) { }

  ngOnInit() {
    this.Group = this.Form.group({
      Limit: "",
      Deposit: "",
      Currency: "",
      Country: "",
      Price: ""
    });

    this.UserService.GetDashboard().subscribe(d => {
      this.Dashboard = d;
      this.Loading = false;

      setTimeout(() => feather.replace(), 100);
    }, err => { 
      this.UserService.Error.HandleError(err);
    });
  }

  public Update(Id: string):void {
    this.Offer = this.Dashboard.Offers.find(o => o.Id === Id);

    this.Group.controls["Limit"].setValue(this.Offer.Limit);
    this.Group.controls["Country"].setValue(this.Offer.Country);
    this.Group.controls["Currency"].setValue(this.Offer.Currency);
    this.Group.controls["Deposit"].setValue(this.Offer.Deposit);
    this.Group.controls["Price"].setValue(this.Offer.Price);

    this.Opened = true;
  }

  public CloseError(data: any):void {
    this.Error = null;
  }

  public Close():void {
    this.Opened = false;
  }

  public SubmitEdit(data: any):void {
    data["Id"] = this.Offer.Id;

    console.log(data);

    this.UserService.EditOffer(data).subscribe(offer => {
      const index = this.Dashboard.Offers.findIndex(d => d.Id === this.Offer.Id);
      this.Dashboard.Offers[index] = offer;

      setTimeout(() => feather.replace(), 100);
    }, err => {
      this.Error = this.UserService.Error.HandleError(err);
    });

    this.Group.reset();
    this.Opened = false;
  }

  public Delete(Id: string):void {
    this.UserService.DeleteOffer({ Id }).subscribe(() => {
      const index = this.Dashboard.Offers.findIndex(o => o.Id === Id);
      this.Dashboard.Offers.splice(index, 1);
    }, err => {
      this.UserService.Error.HandleError(err);
    });
  }

  public Accept(Id: string):void {
    this.UserService.Accept({ Id }).subscribe(() => {
      const index = this.Dashboard.Reviews.findIndex(r => r.Id === Id);
      this.Dashboard.Reviews[index].Accepted = true;
    }, err => {
      this.UserService.Error.HandleError(err);
    });
  }

  public Deny(Id: string):void {
    this.UserService.Deny({ Id }).subscribe(() => {
      const index = this.Dashboard.Reviews.findIndex(r => r.Id === Id);
      this.Dashboard.Reviews.splice(index, 1);
    }, err => {
      this.UserService.Error.HandleError(err);
    });
  }

}
