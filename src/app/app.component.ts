import { Component } from '@angular/core';
import { StorageService } from './Services/Storage.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  public title: string = 'localpicoins';
  public IsOpen: boolean = false;
  public SignedIn: boolean = false;

  constructor(private Storage: StorageService) {
    if(this.Storage.GetCustomer())
      this.SignedIn = true;
  }

  public OnToggle():void {
    this.IsOpen = !this.IsOpen;
  }

  public Logout():void {
    this.Storage.Reset();
    window.location.assign("/");
  }
}
