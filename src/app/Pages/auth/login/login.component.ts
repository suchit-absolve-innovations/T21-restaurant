import { Component, OnInit, Renderer2 } from '@angular/core';
import {
  FormGroup,
  FormBuilder,
  Validators,
  FormControl,
} from '@angular/forms';
import { Router } from '@angular/router';
import { Login } from 'src/app/shared/models/login';
import { AuthService } from 'src/app/shared/service/auth.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { ContentService } from 'src/app/shared/service/content.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;
  loginModel!: Login;
  submitted = false;

  show = false;
  password!: any;
  constructor(
    private renderer: Renderer2,
    private router: Router,
    private spinner: NgxSpinnerService,
    private formBuilder: FormBuilder,
    private auth: AuthService,
    private toasterService: ToastrService,
    private content : ContentService
  ) {}

  ngOnInit(): void {
    this.renderer.addClass(document.querySelector('app-root'), 'login-page');
    this.setConfigurationOfLoginForm();
    this.password = 'password';
  }

  // login form
  setConfigurationOfLoginForm() {
    this.loginForm = this.formBuilder.group({
      emailOrPhone: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
   
    });
  }

  // for validation
  get f() {
    return this.loginForm.controls;
  }
  



  // password eye

  // eye icon show password
  onClick() {
    if (this.password === 'password') {
      this.password = 'text';
      this.show = true;
    } else {
      this.password = 'password';
      this.show = false;
    }
  }

  onLogin() {
    this.submitted = true;
    if (this.loginForm.invalid) {
      return;
    }
    this.spinner.show();
    this.loginModel = this.loginForm.value;
    debugger
    this.auth.login(this.loginModel).subscribe((response) => {
      if (response.messages) {
        this.spinner.hide();
        debugger
        this.router.navigateByUrl('/dashboard');
      } else {
        this.spinner.hide();
        
      }
    });
  }
  

  // tslint:disable-next-line: use-lifecycle-interface
  // ngOnDestroy() {
  //   this.renderer.removeClass(document.querySelector('app-root'), 'login-page');
  // }
}