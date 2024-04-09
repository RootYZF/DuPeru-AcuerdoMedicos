
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { OAuthService } from 'angular-oauth2-oidc';
import { lastValueFrom } from 'rxjs';
import { AuthRespository } from 'src/app/domain/repository/auth/auth.repository';


@Injectable({
    providedIn: 'root'
})
export class AuthWebRepository implements AuthRespository {
    
    constructor(
        private http: HttpClient
        ) {}

    logIn(): Promise<any> {
        return lastValueFrom(this.http.get(''));
    }
}