import { Routes, RouterModule } from '@angular/router';
import { AuthComponent } from './components/auth.component';
import { NgModule } from '@angular/core';
import { AuthBdComponent } from './componentsBd/auth-bd.component';

const routes: Routes = [
  {
    path: '',
    component: AuthBdComponent
   },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule {}
