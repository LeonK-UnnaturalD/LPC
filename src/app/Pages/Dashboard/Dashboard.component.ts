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

    this.InitDashboard();
  }

  public async InitDashboard():Promise<void> {
    const dashboard = this.UserService.GetDashboard();

    await this.UserService.Error.HandleResult(dashboard, (data) => {
      this.Dashboard = data;
      this.Loading = false;
    }, (err) => { 
      console.log(err);
    });

    setTimeout(() => feather.replace(), 100);
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

  public async SubmitEdit(data: any):Promise<void> {
    data["Id"] = this.Offer.Id;

    const editReq = this.UserService.EditOffer(data);

    this.UserService.Error.HandleResult(editReq, (offer) => {
      const index = this.Dashboard.Offers.findIndex(d => d.Id === this.Offer.Id);
      this.Dashboard.Offers[index] = offer;

      setTimeout(() => feather.replace(), 100);
    }, (err) => {
      this.Error = err;
    });

    this.Group.reset();
    this.Opened = false;
  }

  public async Delete(Id: string):Promise<void> {
    const deleteReq = this.UserService.DeleteOffer({ Id });

    this.UserService.Error.HandleResult(deleteReq, (deleteDate) => {
      const index = this.Dashboard.Offers.findIndex(o => o.Id === Id);
      this.Dashboard.Offers.splice(index, 1);
    }, (err) => {
      console.log(err);
    });
  }

  public async Accept(Id: string):Promise<void> {
    const acceptReq = this.UserService.Accept({ Id });

    this.UserService.Error.HandleResult(acceptReq, (accept) => {
      const index = this.Dashboard.Reviews.findIndex(r => r.Id === Id);
      this.Dashboard.Reviews[index].Accepted = true;
    }, (err) => {
      console.log(err);
    });
  }

  public async Deny(Id: string):Promise<void> {
    const denyReq = this.UserService.Deny({ Id });

    this.UserService.Error.HandleResult(denyReq, (deny) => {
      const index = this.Dashboard.Reviews.findIndex(r => r.Id === Id);
      this.Dashboard.Reviews.splice(index, 1);
    }, (err) => {
      console.log(err);
    });
  }

}
