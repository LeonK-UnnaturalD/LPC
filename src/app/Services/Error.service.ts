import { Injectable } from '@angular/core';
import { analyzeAndValidateNgModules } from '@angular/compiler';

@Injectable({
  providedIn: 'root'
})
export class ErrorService {

  constructor() { }

  public async HandleResult(data: Promise<any>, onSucess: Function, onError: Function):Promise<any> {
    data
    .then((data) => {
      return onSucess(data);
    })
    .catch(e => {
      if(!e.error)
        return onError({ Error: "Strange", Code: 1 });

      if(Object.keys(e.error).length !== 2) {
        return onError({ Error: "Someting went wrong", Code: 0 });
      }

      const { Code, Error } = e.error;

      if(Code === 402)
      {
        window.location.assign('/token_expired');
      }
      else if (Code === 401)
      {
        window.location.assign('/not_available');
      }

      onError({ Error, Code });
    });
  }

}
