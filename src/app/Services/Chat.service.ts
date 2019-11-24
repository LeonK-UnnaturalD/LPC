import { Injectable } from '@angular/core';
import { Socket } from 'ngx-socket-io';
import Chat from '../Classes/Chats';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ChatService {
  public Chats: Array<Chat> = new Array<Chat>();

  constructor(private Socket: Socket) {
    this.Chats = [
      { UserId: "0", Username: "Steve", Messages: 
      [
        { Owner: "Leon", Content: "hey", Date: new Date().toDateString() },
        { Owner: "Steve", Content: "leave me alone", Date: new Date().toDateString() }
      ] 
      }
    ]
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
