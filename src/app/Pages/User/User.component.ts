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
  public User: Observable<User>;

  constructor(private Route: ActivatedRoute, private UserService: UserService) {
    
  }

  ngOnInit() {
    const id = this.Route.snapshot.paramMap.get('id');
    this.User = this.UserService.GetUser(id);
  }

}
