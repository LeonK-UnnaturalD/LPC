import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-Introduction',
  templateUrl: './Introduction.component.html',
  styleUrls: ['./Introduction.component.css']
})
export class IntroductionComponent implements OnInit {
  public CustomerCount: number = 1000;
  public CountryCount: number = 274;

  constructor() { }

  ngOnInit() {
  }

  public SignUp():void {
    window.location.assign('/register');
  }

}
