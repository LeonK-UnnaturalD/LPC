import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/Services/Auth.service';

@Component({
  selector: 'app-FacebookAuth',
  templateUrl: './FacebookAuth.component.html',
  styleUrls: ['./FacebookAuth.component.css']
})
export class FacebookAuthComponent implements OnInit {
  public Url: string = "#";

  constructor(private Auth: AuthService) { }

  ngOnInit() {
    this.Url = this.Auth.GetFacebookAuth();
  }

}
