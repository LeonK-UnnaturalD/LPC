import { Component, OnInit } from '@angular/core';
import Chat from 'src/app/Classes/Chats';
import { ChatService } from 'src/app/Services/Chat.service';
import { ActivatedRoute } from '@angular/router';
import feather from 'feather-icons';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-Chat',
  templateUrl: './Chat.component.html',
  styleUrls: ['./Chat.component.css']
})
export class ChatComponent implements OnInit {
  public Chat: Chat = null;
  public Me: string = "Leon";
  public Group: FormGroup;

  constructor(private ChatService: ChatService, private Route: ActivatedRoute, private Form: FormBuilder) {
    this.Group = this.Form.group({
      message: ""
    });
  }

  public OnSubmit(data: any):void {
    this.ChatService.SendMessage(data.message);
  }

  ngOnInit() {
    feather.replace();

    this.ChatService.ReceivedMessage().subscribe(msg => console.log(msg));
  }

}
