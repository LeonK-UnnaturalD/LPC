import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/Services/User.service';
import User from 'src/app/Classes/User';
import { FormBuilder, FormGroup } from '@angular/forms';
import feather from 'feather-icons';

@Component({
  selector: 'app-Profile',
  templateUrl: './Profile.component.html',
  styleUrls: ['./Profile.component.css']
})
export class ProfileComponent implements OnInit {
  public User: User;
  public Group: FormGroup;
  public Loading: boolean = true;
  public Error: { Code: number, Msg: string } = null;

  constructor(private UserService: UserService, private Form: FormBuilder) {
  }

  ngOnInit() {
    this.Group = this.Form.group({
      Username: "",
      Password: "",
      RepeatPassword: "",
      Email: "",
      Language: "",
      OldPassword: ""
    });

    this.UserService.GetProfile().subscribe(prof => {
      this.User = prof;
      this.Loading = false;

      setTimeout(() => feather.replace(), 200);
    }, (err) => {
      this.Error = this.UserService.Error.HandleError(err);
    });
  }

  public DeleteAccount():void {

  }

  public OnChange(data: any):void {
    data["Languages"] = this.User.Languages;

    this.UserService.ChangeProfile(data).subscribe(res => {
      this.User = res;
      window.location.reload(true);
    }, err => {
      this.Error = this.UserService.Error.HandleError(err);
    });

    this.Group.reset();
  }

  public Close():void {
    this.Error = null;
  }

  public AddLanguage(data: any):void {
    const lang: string = data.target.value;

    if(this.User.Languages.find(l => l === lang))
      return;
    
    this.User.Languages.push(lang);

    setTimeout(() => feather.replace(), 100)
  }

  public RemoveLanguage(lang: string) {
    const index = this.User.Languages.findIndex(l => l === lang);
    this.User.Languages.splice(index, 1);
  }

}
