import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthComponent } from './components/auth.component';
import { AuthRoutingModule } from './auth.routing';
import { AuthBdComponent } from './componentsBd/auth-bd.component';

@NgModule({
  imports: [
    CommonModule,
    AuthRoutingModule
  ],
  declarations: [AuthBdComponent]
})
export class AuthModule { }
