import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-Select',
  templateUrl: './Select.component.html',
  styleUrls: ['./Select.component.css']
})
export class SelectComponent implements OnInit {
  @Input() Group: FormGroup;
  @Output() OnChange = new EventEmitter<string>();

  constructor() { }

  ngOnInit() {
  }

  public OnChangeValue(data: any):void {
    this.OnChange.emit(data.target.value);
  }

}
