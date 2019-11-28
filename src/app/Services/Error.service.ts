import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ErrorService {

  constructor() { }

  public HandleError(err: any):{ Code: number, Msg: string } {
    const { Code, Error } = err.error;

    if(Code === 402)
    {
      window.location.assign('/token_expired');
    }
    else if (Code === 401)
    {
      window.location.assign('/not_available');
    }
    
    return { Code: Code, Msg: Error };
  }

}
