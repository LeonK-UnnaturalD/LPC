import { Component, OnInit } from '@angular/core';
import { ChatService } from 'src/app/Services/Chat.service';
import { ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import AuthResponse from 'src/app/Classes/AuthResponse';
import Chat from 'src/app/Classes/Chats';
import { StorageService } from 'src/app/Services/Storage.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { ReportDialogComponent } from 'src/app/Components/ReportDialog/ReportDialog.component';
import { MetaService } from 'src/app/Services/Meta.service';

@Component({
  selector: 'app-Chat',
  templateUrl: './Chat.component.html',
  styleUrls: ['./Chat.component.css']
})
export class ChatComponent implements OnInit {
  public Chat: Chat;
  public Owner: string = "";
  public Group: FormGroup;
  public Loading: boolean = true;
  public Error: { Code: number, Msg: string } = null;

  constructor(
    private ChatService: ChatService, 
    private Route: ActivatedRoute, 
    private Form: FormBuilder, 
    private Storage: StorageService,
    private SnackBar: MatSnackBar,
    private Dialog: MatDialog,
    private Meta: MetaService
    ) {
  }

  public OnSubmit(data: any):void {
    if(this.Group.invalid) return;

    this.ChatService.SendMessage(data.message);
    this.Group.reset();
  }

  ngOnInit() {
    this.Group = this.Form.group({
      message: ""
    },
    {
      validators: Validators.required
    });

    this.Owner = this.Storage.GetCustomer().User.Id;

    const id = this.Route.snapshot.paramMap.get('id');

    this.InitChat(id);
    
    this.ChatService.ReceivedMessage().subscribe(msg => {
      const { message, Id } = msg;
  
      if(Id !== id) return;
  
      this.Chat.Messages.push(message);

      this.ScrollToBottom();
    }, (err) => {

    });

    this.ChatService.JoinChat(id);

    this.ScrollToBottom();
  }

  private ScrollToBottom():void {
    setTimeout(() => {
    document.getElementById('scroll').scrollTop = 999999999;
    }, 1000);
  }

  private async InitChat(Id: string):Promise<void> {
    const chatReq = this.ChatService.GetChat(Id);

    await this.ChatService.Error.HandleResult(chatReq, (chat) => {
      this.Chat = chat;
      this.Loading = false;

      this.Meta.UpdateTitle(`LocalPicoins | Chat`);
      this.Meta.UpdateTag("description", "Chat with your customer, to receive or send money/pi");
    }, (err) => {
      this.Error = err;
    });
  }

  public async OnTrust(Id: string):Promise<void> {
    const trustReq = this.ChatService.Trust(Id);

    this.ChatService.Error.HandleResult(trustReq, (msg) => {
      this.SnackBar.open(msg, null, {
        duration: 2000
      });
    }, (err) => {
      
    });
  }

  public Report(Id: string):void {
    this.Dialog.open(ReportDialogComponent, {
      data: {
        "ChatId": this.Chat.Id,
        "ReportedUserId": Id
      }
    });
  }

  public async Block(Id: string):Promise<void> {
    const blockReq = this.ChatService.Block(this.Chat.Id);

    this.ChatService.Error.HandleResult(blockReq, () => {
      this.ChatService.SendBlock(Id);
      window.location.assign('/chats');
    }, (err) => {

    });
  }

}
