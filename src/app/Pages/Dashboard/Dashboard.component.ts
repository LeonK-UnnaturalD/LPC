import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/Services/User.service';
import DashboardResult from 'src/app/Classes/DashboardResponse';
import Offer from 'src/app/Classes/Offer';
import { FormBuilder, FormGroup } from '@angular/forms';
import { EditOfferDialogComponent } from 'src/app/Components/EditOfferDialog/EditOfferDialog.component';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import Comment from 'src/app/Classes/Comment';

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

  public Offers: MatTableDataSource<Offer> = new MatTableDataSource<Offer>();
  public displayedColumns: string[] = [
    "deposit",
    "price",
    "edit"
  ];

  public Feedbacks: MatTableDataSource<Comment> = new MatTableDataSource<Comment>();
  public feedbackColumns: string[] = [
    "username",
    "rating",
    "options"
  ];

  constructor(public dialog: MatDialog, private UserService: UserService, private Form: FormBuilder) { }

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

      this.Offers = new MatTableDataSource<Offer>(data.Offers);
      this.Feedbacks = new MatTableDataSource<Comment>(data.Reviews);
      this.Loading = false;
    }, (err) => { 
      console.log(err);
    });
  }

  public Update(Id: string):void {
    this.Offer = this.Dashboard.Offers.find(o => o.Id === Id);

    this.dialog.open(EditOfferDialogComponent, {
      width: '250px',
      data: {
          Limit: this.Offer.Limit,
          Country: this.Offer.Country,
          Currency: this.Offer.Currency,
          Deposit: this.Offer.Deposit,
          Price: this.Offer.Price
      }
    });
  }

  public Close():void {
    this.Opened = false;
  }

  public async SubmitEdit(data: any):Promise<void> {
    data["Id"] = this.Offer.Id;

    const editReq = this.UserService.EditOffer(data);

    this.UserService.Error.HandleResult(editReq, (offer) => {
      window.location.reload();
    }, (err) => {
      this.Error = err;
    });

    this.Group.reset();
    this.Opened = false;
  }

  public async Delete(Id: string):Promise<void> {
    const deleteReq = this.UserService.DeleteOffer({ Id });

    this.UserService.Error.HandleResult(deleteReq, () => {
      window.location.reload();
    }, (err) => {
      console.log(err);
    });
  }

  public async Accept(Id: string):Promise<void> {
    const acceptReq = this.UserService.Accept({ Id });

    this.UserService.Error.HandleResult(acceptReq, () => {
      window.location.reload();
    }, (err) => {
      console.log(err);
    });
  }

  public async Deny(Id: string):Promise<void> {
    const denyReq = this.UserService.Deny({ Id });

    this.UserService.Error.HandleResult(denyReq, () => {
      window.location.reload();
    }, (err) => {
      console.log(err);
    });
  }

}
