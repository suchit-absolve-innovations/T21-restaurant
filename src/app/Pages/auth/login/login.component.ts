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
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;
  loginModel!: Login;
  submitted = false;
  show = true;
  password!: string;
  constructor(
    private renderer: Renderer2,
    private formBuilder: FormBuilder,
    public authService: AuthService,
    private router: Router,
    private spinner: NgxSpinnerService
  ) {}

  ngOnInit(): void {
    this.renderer.addClass(document.querySelector('app-root'), 'login-page');
    this.setConfigurationOfLoginForm();
    this.password = 'password';
  }

  // login form
  setConfigurationOfLoginForm() {
    this.loginForm = this.formBuilder.group({
      emailPhone: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      deviceType: [''],
      deviceToken: [''],
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
      this.show = false;
    } else {
      this.password = 'password';
      this.show = true;
    }
  }

  onSubmit() {
    this.submitted = true;
    if (this.loginForm.invalid) {
      return;
    }
    this.spinner.show();
    this.loginModel = this.loginForm.value;
    this.authService.login(this.loginModel).subscribe((response) => {
      if (response.message) {
        this.spinner.hide();
        // localStorage.setItem('currentUser', JSON.stringify(response.data));
        this.router.navigateByUrl('/dashboard');
      } else {
        this.spinner.hide();
      }
    });
  }

  // tslint:disable-next-line: use-lifecycle-interface
  ngOnDestroy() {
    this.renderer.removeClass(document.querySelector('app-root'), 'login-page');
  }
}
