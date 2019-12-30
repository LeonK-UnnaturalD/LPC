import { Component, OnInit } from '@angular/core';
import { StorageService } from 'src/app/Services/Storage.service';
import { BuisnessService } from 'src/app/Services/Buisness.service';
import { ActivatedRoute } from '@angular/router';
import { Buisness } from 'src/app/Classes/Buisness';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { BuisnessBottomSheetComponent } from 'src/app/Components/BuisnessBottomSheet/BuisnessBottomSheet.component';

@Component({
  selector: 'app-GetBuisness',
  templateUrl: './GetBuisness.component.html',
  styleUrls: ['./GetBuisness.component.css']
})
export class GetBuisnessComponent implements OnInit {
  public Buisness: Buisness = null;

  constructor(
    private Storage: StorageService, 
    private BuisnessService: BuisnessService, 
    private Route: ActivatedRoute,
    private MatBottomSheet: MatBottomSheet
    ) { }

  ngOnInit() {
    const id = this.Route.snapshot.queryParamMap.get('id');
    this.Buisness = this.Storage.GetBuisness(id);
    this.Buisness.Logs = this.Buisness.Logs.map(log => {
      var date = new Date(log.Date);
      log.Date = `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()} ${date.getMinutes()}:${date.getHours()}`;
      return log;
    });

    if(!this.Buisness)
      window.location.assign('/not_available');
  }

  public EditMember(Id: string):void {
    const myId = this.Storage.GetCustomer().User.Id;
    const myRole = this.Buisness.Members.find(m => m.Id === myId);

    this.MatBottomSheet.open(BuisnessBottomSheetComponent, {
      data: {
        MemberId: Id,
        RoleId: parseInt(this.Buisness.Members.find(m => m.Id === Id).RoleId),
        Username: this.Buisness.Members.find(m => m.Id === Id).Username,
        Permission: parseInt(myRole.RoleId)
      }
    });
  }

  public GetMyRolePermissions():number {
    const myId = this.Storage.GetCustomer().User.Id;
    const myRole = this.Buisness.Members.find(m => m.Id === myId);

    return parseInt(myRole.RoleId);
  }

  public GetRoleName(Id: string):string {
    switch(Id) {
      case "0":
        return "Employee";
      case "1":
        return "Administrator";
      case "2":
        return "CEO";
      case "3":
        return "Owner";
    }
  }

}
