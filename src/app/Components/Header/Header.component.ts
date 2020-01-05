import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import feather from 'feather-icons';
import { StorageService } from 'src/app/Services/Storage.service';
import User from 'src/app/Classes/User';
import { ChatService } from 'src/app/Services/Chat.service';
import Message from 'src/app/Classes/Messages';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { ErrorComponent } from '../Error/Error.component';

@Component({
  selector: 'app-Header',
  templateUrl: './Header.component.html',
  styleUrls: ['./Header.component.css']
})
export class HeaderComponent implements OnInit {
  @Output() OnToggleNav = new EventEmitter<any>();
  
  public SignedIn: boolean = false;

  constructor(private Snackbar: MatSnackBar, private Storage: StorageService, private ChatService: ChatService, private Dialog: MatDialog) {

  }

  public OpenMenu():void {
    this.OnToggleNav.emit();
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
      console.log(member);
    }, (err) => {

    });

    this.ChatService.RemoveMember().subscribe(member => {
      this.Storage.RemoveOnlineMember(member);
    }, (err) => {

    });

    this.ChatService.ReceivedBlock().subscribe(id => {
      if(id === this.Storage.GetCustomer().User.Id)
        return window.location.assign('/chats');
    });
  }

  private CheckToken():void {
    const expire = parseInt(sessionStorage.getItem("expire"));
    const current = new Date().setHours(new Date().getHours());
          
    if(expire - current <= 0)
    {
      this.Dialog.open(ErrorComponent, {
        minWidth: "250",
        data: {
          ErrorCode: "402",
          ErrorMessage: "Token expired"
        }
      });

      setTimeout(() => {
        this.Storage.Reset();
        window.location.assign('/');
      }, 5000)
    }
  }

  ngOnInit() {
    this.CheckToken();

    setInterval(() => {
      const customer = this.Storage.GetCustomer();
      if(customer)
      {
          this.CheckToken();
      }
    }, 60000);

    this.IsLoggedIn();
    this.InitListeners();

    this.ChatService.ReceivedMessage().subscribe((data) => {
      var url = window.location.href;

      if(!data.Receivers.includes(this.Storage.GetCustomer().User.Id)) return;
      if(url.split('/')[url.split('/').length - 1] === data.Id) return;

      this.Snackbar.open(`You received a new message from ${data.message.Username}` + "\n" + `"${data.message.Content}"`, null, { duration: 2500 });
      this.Storage.AddUnreadMessage(data.Id);
    }, (err) => {
      console.log(err);
    })

    setTimeout(() => feather.replace(), 200);
  }

}
