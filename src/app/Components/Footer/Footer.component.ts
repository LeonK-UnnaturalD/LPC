import { Component, OnInit } from '@angular/core';
import feather from 'feather-icons';

@Component({
  selector: 'app-Footer',
  templateUrl: './Footer.component.html',
  styleUrls: ['./Footer.component.css']
})
export class FooterComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    feather.replace();
  }

}
