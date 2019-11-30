import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/Services/User.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-VerifiedEmail',
  templateUrl: './VerifiedEmail.component.html',
  styleUrls: ['./VerifiedEmail.component.css']
})
export class VerifiedEmailComponent implements OnInit {
  public Loading: boolean = true;

  constructor(private UserService: UserService, private Route: ActivatedRoute) { }

  ngOnInit() {
    const id = this.Route.snapshot.paramMap.get("id");

    this.UserService.VerifyEmail(id).subscribe(res => {
      this.Loading = false;
    }, err => {
      this.UserService.Error.HandleError(err);
    })
  }

}