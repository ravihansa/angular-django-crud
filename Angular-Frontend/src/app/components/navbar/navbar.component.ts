import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { UserService } from './../../shared/services/user.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  constructor(private router: Router,
              private userService: UserService) { }

  ngOnInit() {
  }

  navigateHome() {
    this.router.navigate(['home']);
  }

  logOut() {
    this.router.navigateByUrl('/login');
    this.userService.deleteToken();
  }

}
