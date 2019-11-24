import { Component, OnInit } from '@angular/core';
import feather from 'feather-icons';

@Component({
  selector: 'app-Header',
  templateUrl: './Header.component.html',
  styleUrls: ['./Header.component.css']
})
export class HeaderComponent implements OnInit {
  public IsClicked: boolean = false;
  public SignedIn: boolean = false;

  constructor() {
    if(localStorage.getItem('User'))
      this.SignedIn = true;
    else
      this.SignedIn = false;
  }

  public OpenMenu():void {
    this.IsClicked = !this.IsClicked;
  }

  public Logout():void {
    localStorage.clear();
    window.location.reload(true);
    window.location.assign("/");
  }

  ngOnInit() {
    setTimeout(() => feather.replace(), 100);
  }

}
