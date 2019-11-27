import { Component, OnInit, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-SelectCurrency',
  templateUrl: './SelectCurrency.component.html',
  styleUrls: ['./SelectCurrency.component.css']
})
export class SelectCurrencyComponent implements OnInit {
  @Input() Group: FormGroup;

  constructor() { }

  ngOnInit() {
  }

}
