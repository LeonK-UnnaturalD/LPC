import { Component, OnInit, Input, Output } from '@angular/core';
import feather from 'feather-icons';
import { EventEmitter } from '@angular/core';

@Component({
  selector: 'app-Error',
  templateUrl: './Error.component.html',
  styleUrls: ['./Error.component.css']
})
export class ErrorComponent implements OnInit {
  @Input() ErrorMessage: string;
  @Input() ErrorCode: number;
  @Output() CloseError = new EventEmitter();

  constructor() { }

  ngOnInit() {
    feather.replace();
  }

  public Close():void {
    this.ErrorMessage = null;
    this.ErrorCode = null;

    this.CloseError.emit(null);
  }

}
