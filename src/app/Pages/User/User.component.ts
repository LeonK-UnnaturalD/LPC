import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import User from 'src/app/Classes/User';
import { BuyersService } from 'src/app/Services/Buyers.service';
import feather from 'feather-icons';
import { UserService } from 'src/app/Services/User.service';
import { Observable } from 'rxjs';
import { FormBuilder, FormGroup } from '@angular/forms';
import AuthResponse from 'src/app/Classes/AuthResponse';

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
  public Me: User;

  constructor(private Route: ActivatedRoute, private UserService: UserService, private Form: FormBuilder) {
    
  }

  ngOnInit() {
    this.Group = this.Form.group({
      Rating: "positiv",
      Text: ""
    });

    this.Me = localStorage.getItem("User") ? (<AuthResponse>JSON.parse(localStorage.getItem("User"))).User : null;

    const id = this.Route.snapshot.paramMap.get('id');
    this.UserService.GetUser(id).subscribe(u => {
      this.User = u;
      this.User.CreatedAt = new Date(this.User.CreatedAt).toDateString();
      this.Loading = false;

      setTimeout(() => feather.replace(), 100);
    }, err => { 
      this.Error = this.UserService.Error.HandleError(err);
    });
  }

  public Submit(data: any):void {
    data["UserId"] = this.User.Id;

    this.UserService.CreateReview(data).subscribe(r => {
      window.location.reload(true);
    }, err => {
      this.Error = this.UserService.Error.HandleError(err);
    });

    this.Group.reset();
  }

}
