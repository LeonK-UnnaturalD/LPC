import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import User from 'src/app/Classes/User';
import { BuyersService } from 'src/app/Services/Buyers.service';
import feather from 'feather-icons';
import { UserService } from 'src/app/Services/User.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-User',
  templateUrl: './User.component.html',
  styleUrls: ['./User.component.css']
})
export class UserComponent implements OnInit {
  public User: User;
  public Loading: boolean = true;
  public Error: { Code: number, Msg: string } = null;

  constructor(private Route: ActivatedRoute, private UserService: UserService) {
    
  }

  ngOnInit() {
    const id = this.Route.snapshot.paramMap.get('id');
    this.UserService.GetUser(id).subscribe(u => {
      this.User = u;
      this.User.CreatedAt = new Date(this.User.CreatedAt).toDateString();
      this.Loading = false;
    }, err => { 
      this.Error = this.UserService.Error.HandleError(err);
    });
  }

}
