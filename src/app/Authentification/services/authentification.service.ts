import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {catchError, Observable, throwError} from "rxjs";
import {ResetPassword} from "../../../models/ResetPassword";

@Injectable({
  providedIn: 'root'
})
export class AuthentificationService {

  constructor(private http: HttpClient) { }

  public login(auth: {email: string, password: string}):Observable <any> {
    return this.http.post<any>(`http://localhost:8085/users/login`, auth);
  }
  public forgotPassword(email :string):Observable<any> {
    return this.http.post<any>('http://localhost:8085/user/sendEmail',email);
  }
  public resetPassword(resetPassword:ResetPassword):Observable<string>{
    return this.http.post<string>('http://localhost:8085/user/resetPassword',resetPassword) .pipe(
      catchError(this.errorHandler)
    );
  }
  errorHandler(error: { error: { message: string; }; status: any; message: any; }) {
    let errorMessage = '';
    if(error.error instanceof ErrorEvent) {
      // Get client-side error
      errorMessage = error.error.message;
    } else {
      // Get server-side error
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    console.log(errorMessage);
    return throwError(errorMessage);
  }
}
