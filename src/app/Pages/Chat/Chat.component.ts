import { Component, OnInit } from '@angular/core';
import { ChatService } from 'src/app/Services/Chat.service';
import { ActivatedRoute } from '@angular/router';
import feather from 'feather-icons';
import { FormBuilder, FormGroup } from '@angular/forms';
import AuthResponse from 'src/app/Classes/AuthResponse';
import Chat from 'src/app/Classes/Chats';
import { StorageService } from 'src/app/Services/Storage.service';

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

  constructor(private ChatService: ChatService, private Route: ActivatedRoute, private Form: FormBuilder, private Storage: StorageService) {
  }

  public OnSubmit(data: any):void {
    this.ChatService.SendMessage(data.message);

    this.Group.reset();
  }

  ngOnInit() {
    this.Group = this.Form.group({
      message: ""
    });

    this.Owner = this.Storage.GetCustomer().User.Id;

    const id = this.Route.snapshot.paramMap.get('id');

    this.InitChat(id);
    
    this.ChatService.ReceivedMessage().subscribe(msg => {
      const { message, Id } = msg;
  
      if(Id !== id) return;
  
      this.Chat.Messages.push(message);
  
      this.CreateSvg();

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

      this.CreateSvg();
    }, (err) => {
      this.Error = err;
    });
  }

  private CreateSvg():void {
    setTimeout(() => feather.replace(), 100);
  }

}
