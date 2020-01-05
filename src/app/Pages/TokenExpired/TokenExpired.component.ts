import { Component, OnInit } from '@angular/core';
import { MetaService } from 'src/app/Services/Meta.service';

@Component({
  selector: 'app-TokenExpired',
  templateUrl: './TokenExpired.component.html',
  styleUrls: ['./TokenExpired.component.css']
})
export class TokenExpiredComponent implements OnInit {

  constructor(private Meta: MetaService) { }

  ngOnInit() {
    this.Meta.UpdateTitle(`LocalPicoins | Token expired`);
    this.Meta.UpdateTag("description", "Reset your token");
  }

}
