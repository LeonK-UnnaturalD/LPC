import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/Services/Auth.service';

@Component({
  selector: 'app-GoogleAuth',
  templateUrl: './GoogleAuth.component.html',
  styleUrls: ['./GoogleAuth.component.css']
})
export class GoogleAuthComponent implements OnInit {
  public Url: string = "";

  constructor(private Auth: AuthService) { }

  ngOnInit() {
    this.Url = this.Auth.GetGoogleAuth();
  }

}
