import { Component, OnInit } from '@angular/core';
import { ChatService } from 'src/app/Services/Chat.service';
import Chat from 'src/app/Classes/Chats';
import feather from 'feather-icons';
import { FormBuilder, FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-Chats',
  templateUrl: './Chats.component.html',
  styleUrls: ['./Chats.component.css']
})
export class ChatsComponent implements OnInit {
  public Chats: Array<Chat> = new Array<Chat>();

  constructor(private ChatService: ChatService) {
    this.Chats = this.ChatService.GetChats();
  }

  ngOnInit() {
    feather.replace();
  }

}
