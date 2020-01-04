import { Component, OnInit } from '@angular/core';
import { StorageService } from 'src/app/Services/Storage.service';

@Component({
  selector: 'app-Introduction',
  templateUrl: './Introduction.component.html',
  styleUrls: ['./Introduction.component.css']
})
export class IntroductionComponent implements OnInit {
  public CustomerCount: number = 1000;
  public CountryCount: number = 274;

  constructor(private Storage: StorageService) { }

  ngOnInit() {
  }

  public SignUp():void {
    window.location.assign('/register');
  }

  public SignedIn():boolean {
    return this.Storage.GetCustomer() !== null;
  }

}
