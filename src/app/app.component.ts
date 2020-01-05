import { Component, OnInit, ViewChild, Output, EventEmitter } from '@angular/core';
import { StorageService } from './Services/Storage.service';
import { MatDrawer } from '@angular/material/sidenav';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  public title: string = 'localpicoins';
  public IsOpen: boolean = false;
  public SignedIn: boolean = false;

  @ViewChild(MatDrawer, { static: true }) private Drawer: MatDrawer;

  constructor(private Storage: StorageService) {
    if(this.Storage.GetCustomer())
      this.SignedIn = true;
  }

  ngOnInit() {
    this.Drawer.closedStart.subscribe(() => {
      this.IsOpen = false;
    });
  }

  public OnToggle():void {
    this.IsOpen = !this.IsOpen;
  }

  public Logout():void {
    this.Storage.Reset();
    window.location.assign("/");
  }
}
