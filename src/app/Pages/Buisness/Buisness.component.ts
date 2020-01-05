import { Component, OnInit } from '@angular/core';
import { StorageService } from 'src/app/Services/Storage.service';
import { BuisnessService } from 'src/app/Services/Buisness.service';
import { Buisness } from 'src/app/Classes/Buisness';
import { MetaService } from 'src/app/Services/Meta.service';

@Component({
  selector: 'app-Buisness',
  templateUrl: './Buisness.component.html',
  styleUrls: ['./Buisness.component.css']
})
export class BuisnessComponent implements OnInit {
  public Buisnesses: Buisness[] = new Array<Buisness>();
  public Loading: boolean = true;

  constructor(private Storage: StorageService, private Buisness: BuisnessService, private Meta: MetaService) { }

  ngOnInit() {
    this.InitBuisnesses();
  }

  private async InitBuisnesses():Promise<void> {
    const buisnessReq = this.Buisness.GetBuisnesses();

    await this.Buisness.Error.HandleResult(buisnessReq, (buisnesses) => {
      this.Buisnesses = buisnesses;

      this.Meta.UpdateTitle("LocalPicoins | Your buisnesses");
      this.Meta.UpdateTag("description", "Update or create buisnesses");

      this.Storage.StoreBuisnesses(buisnesses);

      this.Loading = false;
    }, (err) => {
      console.log(err);
    })
  }

  public GetBuisness(Id: string):void {
    window.location.assign(`/get_buisness?id=${Id}`);
  }

}
