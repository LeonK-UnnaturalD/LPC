import { Component, OnInit } from '@angular/core';
import { MetaService } from 'src/app/Services/Meta.service';

@Component({
  selector: 'app-Loading',
  templateUrl: './Loading.component.html',
  styleUrls: ['./Loading.component.css']
})
export class LoadingComponent implements OnInit {

  constructor(private Meta: MetaService) { }

  ngOnInit() {
    this.Meta.UpdateTitle("Loading...");
  }

}
