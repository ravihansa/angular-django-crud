import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { UserService} from './../../../shared/services/user.service';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css']
})
export class SignInComponent implements OnInit {

  model = {email : '', password: ''};
  // tslint:disable-next-line:max-line-length
  emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  serverErrorMessages: string;

  constructor(private router: Router,
              private userService: UserService) { }

  ngOnInit() {
    if (this.userService.isLoggedIn()) {
      this.router.navigateByUrl('/home');
      }
  }

  onSubmit(form: NgForm) {
    this.userService.loginUser(form.value).subscribe(
      res => {
        // tslint:disable-next-line:no-string-literal
        this.userService.setToken(res['token']);
        this.router.navigateByUrl('/home');
      },
      err => {
        this.serverErrorMessages = err.error.message;
      }
    );
  }

}
