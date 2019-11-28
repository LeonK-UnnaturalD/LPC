import { Component, OnInit } from '@angular/core';
import { ChatService } from 'src/app/Services/Chat.service';
import { ActivatedRoute } from '@angular/router';
import feather from 'feather-icons';
import { FormBuilder, FormGroup } from '@angular/forms';
import Message from 'src/app/Classes/Messages';
import AuthResponse from 'src/app/Classes/AuthResponse';

@Component({
  selector: 'app-Chat',
  templateUrl: './Chat.component.html',
  styleUrls: ['./Chat.component.css']
})
export class ChatComponent implements OnInit {
  public Messages: Array<Message>;
  public Owner: string = "";
  public Group: FormGroup;
  public Loading: boolean = true;
  public Error: { Code: number, Msg: string } = null;

  constructor(private ChatService: ChatService, private Route: ActivatedRoute, private Form: FormBuilder) {
  }

  public OnSubmit(data: any):void {
    this.ChatService.SendMessage(data.message);
  }

  ngOnInit() {
    this.Group = this.Form.group({
      message: ""
    });

    this.Owner = (<AuthResponse>JSON.parse(localStorage.getItem("User"))).User.Id;

    const id = this.Route.snapshot.paramMap.get('id');
    this.ChatService.GetChatContent(id).subscribe(msgs => {
      this.Messages = msgs;
      this.Loading = false;

      this.CreateSvg();
    }, err => {
      this.Error = this.ChatService.Error.HandleError(err);
    });

    this.ChatService.JoinChat(id);

    this.ChatService.ReceivedMessage().subscribe(data =>
    {
      const message: Message = data.message;
      const Id: string = data.Id;

      if(Id !== id) return;

      this.Messages.push(message);

      this.CreateSvg();
    }, err => {
      this.Error = this.ChatService.Error.HandleError(err);
    });
  }

  private CreateSvg():void {
    setTimeout(() => feather.replace(), 1000);
  }

}
