import { Injectable } from '@angular/core';
import { Socket } from 'ngx-socket-io';
import Chat from '../Classes/Chats';
import { Observable } from 'rxjs';
import Message from '../Classes/Messages';

@Injectable({
  providedIn: 'root'
})
export class ChatService {
  public Chats: Array<Chat> = new Array<Chat>();

  constructor(private Socket: Socket) {
    
  }

  public GetChats():Array<Chat> {
    return this.Chats;
  }

  public SendMessage(msg: string):void {
    this.Socket.emit("message", msg);
  }

  public ReceivedMessage():Observable<any> {
    return this.Socket.fromEvent<any>("receivedmsg");
  }

}
