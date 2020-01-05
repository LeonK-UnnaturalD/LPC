import { Component, OnInit } from '@angular/core';
import { ChatService } from 'src/app/Services/Chat.service';
import Chat from 'src/app/Classes/Chats';
import feather from 'feather-icons';
import { StorageService } from 'src/app/Services/Storage.service';
import { MetaService } from 'src/app/Services/Meta.service';

@Component({
  selector: 'app-Chats',
  templateUrl: './Chats.component.html',
  styleUrls: ['./Chats.component.css']
})
export class ChatsComponent implements OnInit {
  public Chats: Array<Chat>;
  public Loading: boolean = true;
  public Error: { Code: number, Msg: string } = null;

  constructor(
    private ChatService: ChatService, 
    private Storage: StorageService,
    private Meta: MetaService
    ) {
    
  }

  ngOnInit() {
    this.InitChats();
  }

  private async InitChats():Promise<void> {
    const chatsReq = this.ChatService.GetChats();

    const onlineMembers = this.Storage.GetOnlineMembers();

    await this.ChatService.Error.HandleResult(chatsReq, (chats) => {
      this.Chats = chats.map(c => {
        c.IsAvailable = onlineMembers.includes(c.CustomerId) || onlineMembers.includes(c.OffererId);
        return c;
      })
      this.Loading = false;
        
      this.Meta.UpdateTitle(`LocalPicoins | Chats`);
      this.Meta.UpdateTag("description", "Lists all your chats to interact with them.");
      setTimeout(() => feather.replace(), 100);
    }, (err) => {
      this.Error = err;
    });
  }

  public OpenChat(Id: string):void {
    this.Storage.RemoveUnreadMessages(Id);

    window.location.assign(`/chats/${Id}`);
  }

  public GetBadgeCount(Id: string):number {
    return this.Storage.GetUnreadMessageCount(Id);
  }

  public GetCustomerId():string {
    return this.Storage.GetCustomer().User.Id;
  }

  public async Unblock(Id: string):Promise<void> {
    const blockReq = this.ChatService.Block(Id);

    this.ChatService.Error.HandleResult(blockReq, () => {
      window.location.assign('/chats');
    }, (err) => {

    });
  }

}
