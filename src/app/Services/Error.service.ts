import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ErrorComponent } from '../Components/Error/Error.component';

@Injectable({
  providedIn: 'root'
})
export class ErrorService {

  constructor(private Dialog: MatDialog) { }

  public async HandleResult<T>(data: Promise<T>, onSucess: (data: T) => void, onError: ({ Msg: string, Code: number }) => void):Promise<any> {
    data
    .then((data) => {
      return onSucess(data);
    })
    .catch(e => {
      if(!e.error)
        return onError({ Msg: "Strange", Code: 1 });

      if(Object.keys(e.error).length !== 2) {
        return onError({ Msg: "Someting went wrong", Code: 0 });
      }

      const { Code, Error } = e.error;

      if(Code === 402)
      {
        return window.location.assign('/token_expired');
      }
      else if (Code === 401)
      {
        return window.location.assign('/not_available');
      }

      this.Dialog.open(ErrorComponent, {
        width: "250px",
        data: {
          ErrorCode: Code,
          ErrorMessage: Error
        }
      });

      return onError({Msg: Error, Code});
    });
  }

}
