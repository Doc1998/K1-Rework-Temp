import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../shared/auth.service';
import { LoginRequestPayLoad } from './login.request.payload';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  
})



export class LoginComponent implements OnInit {
  loginRequest: LoginRequestPayLoad;
  loginForm: FormGroup;

  constructor(private authService: AuthService,private activatedRoute: ActivatedRoute, private router: Router,private toastr:ToastrService) {
    this.loginRequest = {
      email: '',
      password: '',
    };
  }

  ngOnInit() {
    this.loginForm = new FormGroup({
      email: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required),
    });
  }

  login() {
    console.log('LOGIN CALLED')
    this.loginRequest.email = this.loginForm?.get('email')?.value;
    this.loginRequest.password = this.loginForm?.get('password')?.value;
    console.log(this.loginRequest.email)
    console.log(this.loginRequest.password)
    //subscribe to the response we recieve from the authservice, if successful navigate to ("/")
    // if error, we set is error to true and our html will display a message
    this.authService.login(this.loginRequest).subscribe(data => {
        this.router.navigateByUrl('home');
        this.toastr.success('Login Successful');
  }, error => {
    this.toastr.error("Error");
  })
  }

  scroll(el: HTMLElement) {
    el.scrollIntoView({ behavior: 'smooth', block: 'center' });
  }
}
