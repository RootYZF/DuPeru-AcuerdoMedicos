import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { ApplicationModule } from './application/application.module';
import { InfraestructureModule } from './infraestructure/infraestructure.module';
import { DomainModule } from './domain/domain.module';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app.routing';
import { TableModule } from 'primeng/table';
import { ConfirmationService, MessageService, SharedModule } from 'primeng/api';
import { ToolbarComponent } from './shared/toolbar/toolbar.component';
import { PrimeNGModule } from './shared/primeng/primeng.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DialogService } from 'primeng/dynamicdialog';
import { AuthModule } from './presentation/auth/auth.module';
import { OAuthModule } from 'angular-oauth2-oidc';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    ApplicationModule,
    InfraestructureModule,
    DomainModule,
    HttpClientModule,
    AppRoutingModule,
    TableModule,
    SharedModule,
    PrimeNGModule,
    AuthModule,
    OAuthModule.forRoot(),
  ],
  providers: [
    DialogService,
    MessageService,
    ConfirmationService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
