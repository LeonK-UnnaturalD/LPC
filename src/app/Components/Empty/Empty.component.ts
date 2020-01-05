import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-Empty',
  templateUrl: './Empty.component.html',
  styleUrls: ['./Empty.component.css']
})
export class EmptyComponent implements OnInit {
  @Input() DisablePC: boolean = false;

  constructor() { }

  ngOnInit() {
  }

}
