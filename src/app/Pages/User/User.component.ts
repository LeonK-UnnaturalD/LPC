import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import User from 'src/app/Classes/User';
import { BuyersService } from 'src/app/Services/Buyers.service';
import feather from 'feather-icons';
import { UserService } from 'src/app/Services/User.service';
import { Observable } from 'rxjs';
import { FormBuilder, FormGroup } from '@angular/forms';
import AuthResponse from 'src/app/Classes/AuthResponse';
import { StorageService } from 'src/app/Services/Storage.service';

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

  constructor(private Route: ActivatedRoute, private Storage: StorageService, private UserService: UserService, private Form: FormBuilder) {
    
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

  private async InitUser(Id: string):Promise<void> {
    const userReq = this.UserService.GetUser(Id);

    await this.UserService.Error.HandleResult(userReq, (user) => {
      this.User = user;
      this.User.CreatedAt = new Date(this.User.CreatedAt).toDateString();
      this.Loading = false;

      setTimeout(() => feather.replace(), 100);
    }, err => { 
      this.Error = err;
    });
  }

  public async Submit(data: any):Promise<void> {
    data["UserId"] = this.User.Id;

    const reviewReq = this.UserService.CreateReview(data);

    await this.UserService.Error.HandleResult(reviewReq, (review) => {
      window.location.reload(true);
    }, err => {
      this.Error = err;
    });

    this.Group.reset();
  }

}
