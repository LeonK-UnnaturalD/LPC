import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import User from 'src/app/Classes/User';
import feather from 'feather-icons';
import { UserService } from 'src/app/Services/User.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { StorageService } from 'src/app/Services/Storage.service';
import { MatDialog } from '@angular/material/dialog';
import { CreateReviewDialogComponent } from 'src/app/Components/CreateReviewDialog/CreateReviewDialog.component';
import { MetaService } from 'src/app/Services/Meta.service';

@Component({
  selector: 'app-User',
  templateUrl: './User.component.html',
  styleUrls: ['./User.component.css']
})
export class UserComponent implements OnInit {
  public User: User;
  public Loading: boolean = true;
  public Error: { Code: number, Msg: string } = null;
  public Group: FormGroup;
  public Profile: { Id: string, Username: string };

  constructor(
    private Route: ActivatedRoute, 
    private Storage: StorageService, 
    private UserService: UserService, 
    private Form: FormBuilder, 
    private Dialog: MatDialog,
    private Meta: MetaService) {
    
  }

  ngOnInit() {
    this.Group = this.Form.group({
      Rating: "positiv",
      Text: ""
    });

    const id = this.Route.snapshot.paramMap.get('id');

    const profile = this.Storage.GetCustomer();
    if(profile)
      this.Profile = profile.User;

    this.InitUser(id);
  }

  public GetDate():string {
    const date: Date = new Date(this.User.NotAvailable);

    return [date.getDate(), date.getMonth() + 1, date.getFullYear()].join('/'); 
  }

  private async InitUser(Id: string):Promise<void> {
    const userReq = this.UserService.GetUser(Id);

    await this.UserService.Error.HandleResult(userReq, (user) => {
      this.User = user;
      this.User.CreatedAt = new Date(this.User.CreatedAt).toDateString();
      this.Loading = false;

      this.Meta.UpdateTitle(`LocalPicoins | ${user.Username}`);
      this.Meta.UpdateTag("description", "See other user information, like by how many people the client has been trusted, if the email is valid, etc.");

      setTimeout(() => feather.replace(), 100);
    }, err => { 
      this.Error = err;
    });
  }

  public CreateReview():void {
    this.Dialog.open(CreateReviewDialogComponent, {
      minWidth: "250px",
      data: this.User
    });
  }

}
