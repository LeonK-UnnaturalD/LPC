import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/Services/User.service';
import User from 'src/app/Classes/User';
import { FormBuilder, FormGroup } from '@angular/forms';
import feather from 'feather-icons';
import { MetaService } from 'src/app/Services/Meta.service';

@Component({
  selector: 'app-Profile',
  templateUrl: './Profile.component.html',
  styleUrls: ['./Profile.component.css']
})
export class ProfileComponent implements OnInit {
  public User: User;
  public Loading: boolean = true;
  public Error: { Code: number, Msg: string } = null;
  public Group: FormGroup;

  constructor(
    private UserService: UserService, 
    private Form: FormBuilder,
    private Meta: MetaService
    ) {
  }

  ngOnInit() {
    this.Group = this.Form.group({
      FirstName: "",
      LastName: "",
      Username: "",
      NPassword: "",
      RPassword: "",
      Email: "",
      Languages: "",
      Country: "",
      City: "",
      ZIP: "",
      Street: "",
      OldPassword: "",
      Terms: "",
      Description: ""
    });

    this.InitProfile();
  }

  public async InitProfile():Promise<void> {
    const profileReq = this.UserService.GetProfile();

    await this.UserService.Error.HandleResult(profileReq, (profile) => {
      this.User = profile;

      this.Group.setValue({
        FirstName: profile.RealName ? profile.RealName.FirstName : "",
        LastName: profile.RealName ? profile.RealName.LastName : "",
        Username: profile.Username,
        NPassword: "",
        RPassword: "",
        Email: profile.Email,
        Languages: profile.Languages ? profile.Languages : [""],
        Country: profile.Location ? profile.Location.Country : "",
        City: profile.Location ? profile.Location.City : "",
        ZIP: profile.Location ? profile.Location.ZIP : "",
        Street: profile.Location ? profile.Location.Street : "",
        OldPassword: "",
        Terms: profile.Terms ? profile.Terms : "",
        Description: profile.Description ? profile.Description : ""
      });

      this.Loading = false;

      this.Meta.UpdateTitle(`LocalPicoins | Your profile`);
      this.Meta.UpdateTag("description", "Edit your terms, your description, your location and others, so clients will trust you even more.");

      setTimeout(() => feather.replace(), 200);
    }, (err) => {
      this.Error = err;
    });
  }

  public DeleteAccount():void {

  }

  public async OnChange(data: any):Promise<void> {
    const changeReq = this.UserService.ChangeProfile(data);

    await this.UserService.Error.HandleResult(changeReq, (change) => {
      this.User = change;
      window.location.reload(true);
    }, err => {
      this.Error = err;
    });
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
