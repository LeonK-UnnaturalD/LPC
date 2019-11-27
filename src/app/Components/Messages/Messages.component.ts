import { Component, OnInit, Input } from '@angular/core';
import AuthResponse from 'src/app/Classes/AuthResponse';

@Component({
  selector: 'app-Messages',
  templateUrl: './Messages.component.html',
  styleUrls: ['./Messages.component.css']
})
export class MessagesComponent implements OnInit {
  @Input() public Owner: string;
  @Input() public Username: string;
  @Input() public Date: string;
  @Input() public Content: string;
  @Input() public MyId: string;

  constructor() { }

  ngOnInit() {
    const date = new Date(this.Date);
    this.Date = date.getHours() + ":" + date.getMinutes() + " - " + date.getDate() + "/" + (date.getMonth() + 1);
  }

}
