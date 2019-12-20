import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import feather from 'feather-icons';
import { StorageService } from 'src/app/Services/Storage.service';
import User from 'src/app/Classes/User';
import { ChatService } from 'src/app/Services/Chat.service';
import Message from 'src/app/Classes/Messages';
import { SwPush } from '@angular/service-worker';

@Component({
  selector: 'app-Header',
  templateUrl: './Header.component.html',
  styleUrls: ['./Header.component.css']
})
export class HeaderComponent implements OnInit {
  public IsClicked: boolean = false;
  public SignedIn: boolean = false;

  readonly Key: string = "BIxs1J3mnbbJBkifCQ9PYjSyelpsI62ekaIlM3D0cO896C2nGtp-ADAbE4acdCnp5T1nHwHf40HXqKBznJkgPc4";

  @Output() OnReceivedMessage = new EventEmitter<Message>();

  constructor(private Storage: StorageService, private ChatService: ChatService) {

  }

  public OpenMenu():void {
    this.IsClicked = !this.IsClicked;
  }

  public Logout():void {
    this.Storage.Reset();
    window.location.assign("/");
  }

  private IsLoggedIn():void {
    if(this.Storage.GetCustomer())
    {
      this.SignedIn = true;
      this.ChatService.JoinApp();
    }
  }

  private InitListeners():void {
    if(!this.SignedIn) return;

    this.ChatService.ReceivedOnlineList().subscribe(list => {
      this.Storage.FillOnlineMembers(list);
    }, (err) => {

    })

    this.ChatService.AddMember().subscribe(member => {
      this.Storage.AddOnlineMember(member);
    }, (err) => {

    });

    this.ChatService.RemoveMember().subscribe(member => {
      this.Storage.RemoveOnlineMember(member);
    }, (err) => {

    });
  }

  ngOnInit() {
    this.IsLoggedIn();

    this.InitListeners();

    setTimeout(() => feather.replace(), 200);
  }

}
