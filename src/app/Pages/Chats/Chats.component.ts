import { Component, OnInit } from '@angular/core';
import { ChatService } from 'src/app/Services/Chat.service';
import Chat from 'src/app/Classes/Chats';
import feather from 'feather-icons';

@Component({
  selector: 'app-Chats',
  templateUrl: './Chats.component.html',
  styleUrls: ['./Chats.component.css']
})
export class ChatsComponent implements OnInit {
  public Chats: Array<Chat>;
  public Loading: boolean = true;
  public Error: { Code: number, Msg: string } = null;

  constructor(private ChatService: ChatService) {
    
  }

  ngOnInit() {
    this.ChatService.GetChats().subscribe(chats => {
      this.Chats = chats;
      this.Loading = false;

      setTimeout(() => feather.replace(), 250);
    }, err => {
      this.Error = this.ChatService.Error.HandleError(err);
    });
  }

}
