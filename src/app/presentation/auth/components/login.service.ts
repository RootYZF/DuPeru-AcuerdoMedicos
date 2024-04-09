import { Injectable } from '@angular/core';
import { OAuthService } from 'angular-oauth2-oidc';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private readonly authService: OAuthService) {
    this.configLogin();
  }

  configLogin() {
    this.authService.configure(
      {
        issuer: 'https://accounts.google.com',
        strictDiscoveryDocumentValidation: false,
        redirectUri: window.location.origin + '/admin',
        clientId: '871146371108-p44d4oh25drp3t8ncig1nu1if9naup10.apps.googleusercontent.com',
        scope: 'openid profile email',
      }
    );
    this.authService.setupAutomaticSilentRefresh();
    this.authService.loadDiscoveryDocumentAndTryLogin();
  }

  logIn() {
    this.authService.initLoginFlow();
  }

  logOut() {
    this.authService.logOut();
  }

  getProfile() {
    return this.authService.getIdentityClaims();
  }

}
