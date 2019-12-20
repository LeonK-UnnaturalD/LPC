import { Injectable } from '@angular/core';
import User from '../Classes/User';
import AuthResponse from '../Classes/AuthResponse';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  constructor() {
    if(!window.sessionStorage) {
      console.error("No session storage supported");
      return;
    }
  }

  public SetCustomer(Auth: AuthResponse):void {
    sessionStorage.setItem("auth", JSON.stringify(Auth));
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
}
