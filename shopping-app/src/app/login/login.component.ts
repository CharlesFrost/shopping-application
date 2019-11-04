import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {AuthService} from '../service/auth.service';
import {TokenStorageService} from '../service/token-storage.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  username: string = '';
  password: string = '';
  fail: boolean = false;

  constructor(private router: Router, private auth: AuthService, private token: TokenStorageService) { }


  ngOnInit() {
    if (this.auth.isAuthenticated()) {
      this.router.navigate(['home']);
    }
  }

  login() {
    if (this.username !== '' && this.password !== '') {
      this.auth.attemptAuth(this.username.trim(), this.password.trim())
        .subscribe((value) => {
          if (value === null || value === '') {
            this.fail=true;
            return;
          }
          this.token.saveToken(value);
          this.router.navigate(['home']);
        }, error => {
          this.fail = true;
        });
    } else {
      this.fail = true;
    }
  }
}


