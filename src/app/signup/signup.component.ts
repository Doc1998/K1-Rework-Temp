import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { LoginRequestPayLoad } from '../login/login.request.payload';
import { AuthService } from '../shared/auth.service';
import { SignupRequestPayLoad } from './signupRequest.payload';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  signupRequestPayload: SignupRequestPayLoad;
  signupForm: FormGroup;
  constructor(private authService: AuthService,private router: Router,private toastr:ToastrService) {
    this.signupRequestPayload = {
      email: '',
      password: '',
    };
  }

  ngOnInit(): void {
    this.signupForm = new FormGroup({
      email: new FormControl('',[Validators.required,Validators.email]),
      password: new FormControl('',[Validators.required,Validators.minLength(6)])
    })
  }
  signup(){
    this.signupRequestPayload.email = this.signupForm?.get('email')?.value;
    this.signupRequestPayload.password = this.signupForm.get('password')?.value;

    this.authService.signup(this.signupRequestPayload).subscribe(data => {
      this.router.navigate(['login'],
        { queryParams: { registered: 'true' } });
    }, error => {
      this.toastr.error('Registration failed, username or email may already exist');
    });

  }
  scroll(el: HTMLElement) {
    el.scrollIntoView({ behavior: 'smooth', block: 'center' });
  }
}
