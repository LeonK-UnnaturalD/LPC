import { Component, OnInit } from '@angular/core';
import { ChatService } from 'src/app/Services/Chat.service';
import Chat from 'src/app/Classes/Chats';
import feather from 'feather-icons';
import { StorageService } from 'src/app/Services/Storage.service';

@Component({
  selector: 'app-Chats',
  templateUrl: './Chats.component.html',
  styleUrls: ['./Chats.component.css']
})
export class ChatsComponent implements OnInit {
  public Chats: Array<Chat>;
  public Loading: boolean = true;
  public Error: { Code: number, Msg: string } = null;

  constructor(private ChatService: ChatService, private Storage: StorageService) {
    
  }

  ngOnInit() {
    this.InitChats();
  }

  private async InitChats():Promise<void> {
    const chatsReq = this.ChatService.GetChats();

    const onlineMembers = this.Storage.GetOnlineMembers();

    await this.ChatService.Error.HandleResult(chatsReq, (chats) => {
      this.Chats = chats.map(c => {
        c.IsAvailable = onlineMembers.includes(c.Id);
        return c;
      })
      this.Loading = false;

      setTimeout(() => feather.replace(), 100);
    }, (err) => {
      this.Error = err;
    });
  }

}
