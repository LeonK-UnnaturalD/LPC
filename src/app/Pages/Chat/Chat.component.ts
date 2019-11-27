import { Component, OnInit } from '@angular/core';
import { ChatService } from 'src/app/Services/Chat.service';
import { ActivatedRoute } from '@angular/router';
import feather from 'feather-icons';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Observable } from 'rxjs';
import Message from 'src/app/Classes/Messages';
import AuthResponse from 'src/app/Classes/AuthResponse';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-Chat',
  templateUrl: './Chat.component.html',
  styleUrls: ['./Chat.component.css']
})
export class ChatComponent implements OnInit {
  public Messages: Observable<Array<Message>>;
  public Owner: string = "";
  public Group: FormGroup;

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
    this.Messages = this.ChatService.GetChatContent(id);

    this.ChatService.JoinChat(id);

    this.ChatService.ReceivedMessage().subscribe(chatId =>
    {
      if(chatId !== id) return;

      this.Messages = this.ChatService.GetChatContent(id);
    });
  }

}
