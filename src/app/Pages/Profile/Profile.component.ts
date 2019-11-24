import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/Services/User.service';
import User from 'src/app/Classes/User';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-Profile',
  templateUrl: './Profile.component.html',
  styleUrls: ['./Profile.component.css']
})
export class ProfileComponent implements OnInit {
  public User: User = null;
  public Loading: boolean = true;
  public Group: FormGroup;

  constructor(private UserService: UserService, private Form: FormBuilder) {
    this.Group = this.Form.group({
      Username: "",
      Password: "",
      Email: ""
    });
  }

  ngOnInit() {
    this.UserService.GetProfile().subscribe(res => {
      this.User = res;
      this.Loading = false;
    });
  }

  public DeleteAccount():void {
    localStorage.clear();
    window.location.reload(true);
    window.location.assign("/");
  }

  public OnChange(data: any):void {

  }

}
