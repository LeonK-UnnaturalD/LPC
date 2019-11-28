import { Injectable } from '@angular/core';
import Chat from '../Classes/Chats';
import { Observable } from 'rxjs';
import Message from '../Classes/Messages';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import AuthResponse from '../Classes/AuthResponse';
import { Socket } from 'ngx-socket-io';
import { ErrorService } from './Error.service';

@Injectable({
  providedIn: 'root'
})
export class ChatService {
  private url: string = "https://findpinearyou.herokuapp.com/api/";
  private Res: AuthResponse = null;
  private Id: string;

  constructor(private http: HttpClient, private Socket: Socket, public Error: ErrorService) {
    this.Res = <AuthResponse>JSON.parse(localStorage.getItem("User"));
  }

  public GetChats():Observable<Array<Chat>> {
    const headers = new HttpHeaders().set("Authorization", `Bearer ${this.Res.Token}`);

    return this.http.get<Array<Chat>>(this.url + "chats", { headers: headers });
  }

  public GetChatContent(Id: string):Observable<Array<Message>> {
    const headers = new HttpHeaders().set("Authorization", `Bearer ${this.Res.Token}`);

    this.Id = Id;
    return this.http.get<Array<Message>>(this.url + `chats/${Id}`, { headers: headers });
  }

  public SendMessage(msg: string):void {
    this.Socket.emit("message", new Message(
      this.Res.User.Id, this.Res.User.Username, msg, new Date().toISOString()
    ));
  }

  public JoinChat(Id: string):void {
    this.Socket.emit("join", Id);
  }

  public ReceivedMessage():Observable<any> {
      return this.Socket.fromEvent<any>("receivedmsg");
  }

}
