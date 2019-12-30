import { Injectable } from '@angular/core';
import { StorageService } from './Storage.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Buisness } from '../Classes/Buisness';
import { ErrorService } from './Error.service';

@Injectable({
  providedIn: 'root'
})
export class BuisnessService {
  private url: string = "https://findpinearyou.herokuapp.com/api/";
  private token: string;

  constructor(private Storage: StorageService, private http: HttpClient, public Error: ErrorService) { 
    this.token = this.Storage.GetCustomer().Token;
  }

  public GetBuisnesses():Promise<Buisness[]> {
    return this.http.get<Buisness[]>(this.url + "buisness", 
    { headers: 
      new HttpHeaders().append("Authorization", `Bearer ${this.token}`) 
    }).toPromise();
  }

  public CreateBuisness(data: any):Promise<Buisness> {
    return this.http.post<Buisness>(this.url + "create_buisness", data,
    { headers: 
      new HttpHeaders().append("Authorization", `Bearer ${this.token}`) 
    }).toPromise();
  }

}
