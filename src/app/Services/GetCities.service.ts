import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class GetCitiesService {

  constructor(private http: HttpClient) { }

  public GetCities(code: string, onSuccess: (cities: Array<string>) => void, onError: (err: any) => void):void {
    this.http.get('assets/Cities.txt', { "responseType": "text" }).subscribe(text => {
      const lines = text.split('\n');

      var currentLine = 0;

      const queryCities:Array<string> = new Array();

      while(currentLine < lines.length)
      {
        var line = lines[currentLine].slice(1, 45);
        var lineWithData = line.split(' ').filter(s => s !== '');

        if(lineWithData[0] === code)
        {
          queryCities.push(lineWithData[2]);
        }
        
        ++currentLine;
      }

      for(var i = 0; i < queryCities.length; i++)
      {
        for(var j = 0; j < queryCities.length; j++)
        {
          if(queryCities[i] === queryCities[j] || !queryCities[j].trim())
          {
            queryCities.splice(j, 1);
          }
        }
      }

      return onSuccess(queryCities);
    }, (err) => {
      return onError(err);
    });
  }

}
