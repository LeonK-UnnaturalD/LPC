import { Component, OnInit, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-Select',
  templateUrl: './Select.component.html',
  styleUrls: ['./Select.component.css']
})
export class SelectComponent implements OnInit {
  @Input() Group: FormGroup;

  constructor() { }

  ngOnInit() {
  }

}
