import { Component, OnInit } from '@angular/core';
import { MetaService } from 'src/app/Services/Meta.service';

@Component({
  selector: 'app-Unavailable',
  templateUrl: './Unavailable.component.html',
  styleUrls: ['./Unavailable.component.css']
})
export class UnavailableComponent implements OnInit {

  constructor(private Meta: MetaService) { }

  ngOnInit() {
    this.Meta.UpdateTitle(`LocalPicoins | Unavailable`);
    this.Meta.UpdateTag("description", "Doesn't exist");
  }

}
