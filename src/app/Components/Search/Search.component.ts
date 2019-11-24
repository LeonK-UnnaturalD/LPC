import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-Search',
  templateUrl: './Search.component.html',
  styleUrls: ['./Search.component.css']
})
export class SearchComponent implements OnInit {
  public IsBuying: boolean = true;

  constructor() { }

  ngOnInit() {
  }

  SetToBuy():void {
    this.IsBuying = true;
  }

  SetToSell():void {
    this.IsBuying = false;
  }

}
