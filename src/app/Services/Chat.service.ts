import { Injectable } from '@angular/core';
import Chat from '../Classes/Chats';
import { Observable } from 'rxjs';
import Message from '../Classes/Messages';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import AuthResponse from '../Classes/AuthResponse';
import { Socket } from 'ngx-socket-io';
import { ErrorService } from './Error.service';
import { StorageService } from './Storage.service';

@Injectable({
  providedIn: 'root'
})
export class ChatService {
  private url: string = "https://findpinearyou.herokuapp.com/api/";
  private Res: AuthResponse = null;
  private Id: string;

  constructor(private http: HttpClient, private Socket: Socket, public Error: ErrorService, private Storage: StorageService) {
    const profile = this.Storage.GetCustomer();

    if(profile)
      this.Res = profile;
  }

  public ReceivedMessage():Observable<{ message: Message, Id: string, Receivers: string[] }> {
      return this.Socket.fromEvent<{ message: Message, Id: string, Receivers: string[] }>("OnReceivedMessage");
  }

  public ReceivedOnlineList():Observable<Array<string>> {
    return this.Socket.fromEvent<Array<string>>("OnGetOnlineMembers");
  }

  public RemoveMember():Observable<string> {
    return this.Socket.fromEvent<string>("OnUserLeftApp");
  }

  public AddMember():Observable<string> {
    return this.Socket.fromEvent<string>("OnUserJoinedApp");
  }

  public ReceivedBlock():Observable<string> {
    return this.Socket.fromEvent<string>("OnReceivedBlock");
  }

  public async GetChats():Promise<Array<Chat>> {
    const headers = new HttpHeaders().set("Authorization", `Bearer ${this.Res.Token}`);

    return this.http.get<Array<Chat>>(this.url + "chats", { headers: headers }).toPromise();
  }

  public async GetChat(Id: string):Promise<Chat> {
    const headers = new HttpHeaders().set("Authorization", `Bearer ${this.Res.Token}`);

    this.Id = Id;
    return this.http.get<Chat>(this.url + `chats/${Id}`, { headers: headers }).toPromise();
  }

  public SendMessage(msg: string):void {
    this.Socket.emit("message", new Message(
      this.Res.User.Id, this.Res.User.Username, msg, new Date().toISOString()
    ));
  }

  public JoinChat(Id: string):void {
    this.Socket.emit("joinChat", Id);
  }

  public JoinApp():void {
    const profile = this.Storage.GetCustomer();

    if(profile)
      this.Socket.emit("joinApp", profile.User.Id);
  }

  public SendBlock(Id: string):void {
    this.Socket.emit("block", Id);
  }

  public Trust(Id: string):Promise<string> {
    return this.http.post<string>(this.url + "trust", { Id }, { headers: new HttpHeaders().append("Authorization", `Bearer ${this.Res.Token}`) }).toPromise();
  }

  public async Report(data: any):Promise<void> {
    return this.http.post<void>(this.url + "report", data, { headers: new HttpHeaders().append("Authorization", `Bearer ${this.Res.Token}`) }).toPromise();
  }
  
  public async Block(Id: string):Promise<void> {
    return this.http.post<void>(this.url + "block", { Id }, { headers: new HttpHeaders().append("Authorization", `Bearer ${this.Res.Token}`) }).toPromise();
  }

}
