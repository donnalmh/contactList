import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../environments/environment';
import { Login } from './login.model';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  readonly baseURL = environment.apiUrl + '/auth' 

   constructor(private http: HttpClient) { }
   
   login(details: Login) {
    return this.http.post(this.baseURL + '/login', details)
  }

}
