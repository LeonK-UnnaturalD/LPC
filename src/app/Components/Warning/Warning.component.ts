import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-Warning',
  templateUrl: './Warning.component.html',
  styleUrls: ['./Warning.component.css']
})
export class WarningComponent implements OnInit {
  @Input() Content: string;

  constructor() { }

  ngOnInit() {
  }

}
