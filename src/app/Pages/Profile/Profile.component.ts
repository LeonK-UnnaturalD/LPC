import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/Services/User.service';
import User from 'src/app/Classes/User';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Observable, Subject, of } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Component({
  selector: 'app-Profile',
  templateUrl: './Profile.component.html',
  styleUrls: ['./Profile.component.css']
})
export class ProfileComponent implements OnInit {
  public User: Observable<User>;
  public Group: FormGroup;
  public LoadingError = new Subject<boolean>();

  constructor(private UserService: UserService, private Form: FormBuilder) {
  }

  ngOnInit() {
    this.Group = this.Form.group({
      Username: "",
      Password: "",
      Email: ""
    });

    this.User = this.UserService.GetProfile().pipe(
      catchError((err) => {
        console.log(err);
        this.LoadingError.next(true);
        return of<User>();
      })
    )
  }

  public DeleteAccount():void {
    localStorage.clear();
    window.location.reload(true);
    window.location.assign("/");
  }

  public OnChange(data: any):void {

  }

}
