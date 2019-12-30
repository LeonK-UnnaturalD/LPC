import { Injectable } from '@angular/core';
import AuthResponse from '../Classes/AuthResponse';
import { Buisness } from '../Classes/Buisness';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  constructor() {
    if(!window.sessionStorage) {
      console.error("No session storage supported");
      return;
    }

    if(!window.localStorage) {
      console.error("No local storage supported");
      return;
    }
  }

  public SetCustomer(Auth: AuthResponse):void {
    sessionStorage.setItem("auth", JSON.stringify(Auth));
    sessionStorage.setItem("expire", (new Date().setHours(new Date().getHours() + 1)).toString());
  }

  public FillOnlineMembers(Members: Array<string>):void {
    sessionStorage.setItem("online", JSON.stringify(Members));
  }

  public AddOnlineMember(Member: string):void {
    const members = <Array<string>>JSON.parse(sessionStorage.getItem("online"));
    members.push(Member);

    sessionStorage.setItem("online", JSON.stringify(members));
  }

  public GetOnlineMembers():Array<string> {
    return <Array<string>>JSON.parse(sessionStorage.getItem("online"));
  }

  public RemoveOnlineMember(Member: string):void {
    const members = <Array<string>>JSON.parse(sessionStorage.getItem("online"));

    const index = members.findIndex(m => m === Member);
    members.splice(index, 1);

    sessionStorage.setItem("online", JSON.stringify(members));
  }

  public GetCustomer():AuthResponse {
    return <AuthResponse>JSON.parse(sessionStorage.getItem("auth"));
  }

  public Reset():void {
    sessionStorage.clear();
  }

  public GetUnreadMessageCount(Id: string):number {
    const count = localStorage.getItem(`chat-${Id}`);
    if(!count) return 0;

    return parseInt(count);
  }

  public AddUnreadMessage(Id: string):void {
    const count = localStorage.getItem(`chat-${Id}`);

    if(!count)
      return localStorage.setItem(`chat-${Id}`, (1).toString());

    localStorage.setItem(`chat-${Id}`, (parseInt(count) + 1).toString());
  }

  public RemoveUnreadMessages(Id: string):void {
    const count = localStorage.getItem(`chat-${Id}`);

    if(!count) return;

    localStorage.removeItem(`chat-${Id}`);
  }

  public StoreBuisnesses(buisnesses: Buisness[]):void {
    sessionStorage.setItem("buisnesses", JSON.stringify(buisnesses));
  }

  public GetBuisness(Id: string):Buisness {
    const buisnesses: Buisness[] = JSON.parse(sessionStorage.getItem("buisnesses"));

    if(!buisnesses)
      return null;

    return buisnesses.find(b => b.Id === Id);
  }
}
