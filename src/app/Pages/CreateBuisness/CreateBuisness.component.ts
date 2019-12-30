import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { BuisnessService } from 'src/app/Services/Buisness.service';
import { UserService } from 'src/app/Services/User.service';
import { StorageService } from 'src/app/Services/Storage.service';

@Component({
  selector: 'app-CreateBuisness',
  templateUrl: './CreateBuisness.component.html',
  styleUrls: ['./CreateBuisness.component.css']
})
export class CreateBuisnessComponent implements OnInit {
  public Group: FormGroup;
  public MembersFound = new Array<{ Id: string, Username: string }>();
  public SelectedMembers: { Id: string, Username: string, RoleId: string }[] = new Array<{ Id: string, Username: string, RoleId: string }>();

  constructor(private Storgae: StorageService, private Form: FormBuilder, private Buisness: BuisnessService, private UserService: UserService) { }

  ngOnInit() {
    this.Group = this.Form.group({
      Name: "",
      Email: "",
      Street: "",
      ZIP: "",
      Country: "",
      City: ""
    },
    {
      validators: Validators.required
    });
  }

  public OnSubmit(data: any):void {

  }

  public async FindMember(data: any):Promise<void> {
    if(data.target.value === "") {
      this.MembersFound = [];
      return;
    }

    const usersReq = this.UserService.FindMembers(data.target.value);

    await this.UserService.Error.HandleResult(usersReq, (users) => {
      this.MembersFound = users;
    }, (err) => {
      console.log(err);
    });
  }

  public ChangeList(data: any):void {
    const selected: string[] = data.value;

    selected.forEach(val => {
      if(!this.SelectedMembers.find(m => m.Id === val))
      {
        this.SelectedMembers.push({
          Username: this.MembersFound.find(m => m.Id === val).Username,
          Id: val,
          RoleId: ""
        });
      }
    });
  }

  public ListMembers():string {
    return this.SelectedMembers.map(s => s.Username).join(', ');
  }

  public Remove(Id: string):void {
    const index = this.SelectedMembers.findIndex(u => u.Id === Id);
    this.SelectedMembers.splice(index, 1);
  }

  public SetRole(data: any, UserId: string):void {
    const index = this.SelectedMembers.findIndex(m => m.Id === UserId);
    this.SelectedMembers[index].RoleId = data.value;
  }

  public async Submit(data: any):Promise<void> {
    if(this.Group.invalid) return;

    this.SelectedMembers.push({
      Username: "",
      Id: this.Storgae.GetCustomer().User.Id,
      RoleId: "3"
    });

    data["Members"] = this.SelectedMembers.map(m => {
      return `${m.Id}-${m.RoleId}`;
    }).join(', ');

    const createReq = this.Buisness.CreateBuisness(data);

    await this.Buisness.Error.HandleResult(createReq, (buisness) => {
      console.log(buisness);
    }, (err) => {
      console.log(err);
    })
  }

}
