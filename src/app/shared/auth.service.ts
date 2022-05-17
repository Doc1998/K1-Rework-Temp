import { Injectable } from '@angular/core';
import { LocalStorageService } from 'ngx-webstorage';
import {HttpClient} from '@angular/common/http';
import { LoginResponse } from '../login/loginResponse.payload';
import { map, Observable, tap, throwError } from 'rxjs';
import { LoginRequestPayLoad } from '../login/login.request.payload';
import { UserModel } from './user-model';
import { SignupRequestPayLoad } from '../signup/signupRequest.payload';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  refreshTokenPayload = {
    refreshToken: this.localStorage.retrieve('refreshToken'),
    username: this.localStorage.retrieve('username')
  }
  constructor(private httpClient : HttpClient,private localStorage: LocalStorageService) { }
  signup(signupRequestPayload: SignupRequestPayLoad): Observable<any>{
    return this.httpClient.post('http://localhost:8080/api/auth/signup', signupRequestPayload,{responseType: 'text'});
  }
  login(loginRequestPayload : LoginRequestPayLoad): Observable<boolean> {
    return this.httpClient.post<LoginResponse>('http://localhost:8080/api/auth/login',
      loginRequestPayload).pipe(map(data => {
        this.localStorage.store('jwt', data.jwt);
        this.localStorage.store('username', data.email);
        this.localStorage.store('refreshToken', data.refreshToken);
        this.localStorage.store('expiresAt', data.expiresAt);
        return true;
      }));
  }
  refreshToken() {
    return this.httpClient.post<LoginResponse>('http://localhost:8080/api/auth/refresh/token',
      this.refreshTokenPayload)
      .pipe(tap(response => {
        this.localStorage.clear('jwt');
        this.localStorage.clear('expiresAt');

        this.localStorage.store('jwt',
          response.jwt);
        this.localStorage.store('expiresAt', response.expiresAt);
      }));
  }
  isLoggedIn(): boolean {
    return this.getJwtToken() != null;
  }
  getCurrentUser(): Observable<UserModel>{
    return this.httpClient.get<UserModel>('http://localhost:8080/api/auth/currentUser')
  }
  logout() {
    this.httpClient.post('http://localhost:8080/api/auth/logout', this.refreshTokenPayload,
      { responseType: 'text' })
      .subscribe(data => {
        console.log(data);
      }, error => {
        throwError(error);
      })
    this.localStorage.clear('jwt');
    this.localStorage.clear('username');
    this.localStorage.clear('refreshToken');
    this.localStorage.clear('expiresAt');
  }
  getJwtToken(){
    return this.localStorage.retrieve('jwt');
  }
}
