import { Component, OnInit } from '@angular/core';
import { LoginService } from './login.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit {

  constructor(private readonly authGoogleService: LoginService ) { }

  ngOnInit() {
  }

  logIn() {
    this.authGoogleService.logIn();
  }
}
