import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpErrorResponse } from '@angular/common/http';
import { AuthService } from './shared/auth.service';
import { BehaviorSubject, Observable } from 'rxjs';
import { catchError, filter, switchMap, take } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { LoginResponse } from './login/loginResponse.payload';
@Injectable({
    providedIn: 'root'
})
export class TokenInterceptor {
 
}