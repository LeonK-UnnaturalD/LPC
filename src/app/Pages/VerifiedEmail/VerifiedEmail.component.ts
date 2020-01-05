import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/Services/User.service';
import { ActivatedRoute } from '@angular/router';
import { MetaService } from 'src/app/Services/Meta.service';

@Component({
  selector: 'app-VerifiedEmail',
  templateUrl: './VerifiedEmail.component.html',
  styleUrls: ['./VerifiedEmail.component.css']
})
export class VerifiedEmailComponent implements OnInit {
  public Loading: boolean = true;

  constructor(
    private UserService: UserService, 
    private Route: ActivatedRoute,
    private Meta: MetaService) { }

  ngOnInit() {
    const id = this.Route.snapshot.paramMap.get("id");

    this.InitEmail(id);
  }

  private async InitEmail(Id: string):Promise<void> {
    const verifyReq = this.UserService.VerifyEmail(Id);

    await this.UserService.Error.HandleResult(verifyReq, (email) => {
      this.Loading = false;

      this.Meta.UpdateTitle(`LocalPicoins | Verified Email`);
      this.Meta.UpdateTag("description", "Hurray! You successfully verified your email.");
    }, err => {
      console.error(err);
    });
  }

}
