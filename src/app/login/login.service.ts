import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../environments/environment';
import { Login } from './login.model';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

   constructor(private http: HttpClient) { }
   
   readonly baseURL = environment.apiUrl + '/auth' 

   login(details: Login) {
    return this.http.post(this.baseURL + '/login', details)
  }

}
