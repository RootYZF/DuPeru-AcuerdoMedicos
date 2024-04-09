import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';

//const DEFAULT_ROUTE: string = '/login'
const DEFAULT_ROUTE: string = '/admin/medical-agreements'

const routes: Routes = [
  {
    path: '',
    redirectTo: DEFAULT_ROUTE,
    pathMatch: 'full'

  },
  {
    path: 'login',
    loadChildren: () => import('./presentation/auth/auth.module').then(m => m.AuthModule),
  },
  // Admin module
  {
    path: 'admin',
    loadChildren: () => import('./presentation/admin/admin.module').then(m => m.AdminModule),
  },

  {
    path: 'medical-agreements',
    loadChildren: () => import('./presentation/admin/medical-agreements/medical-agreements.module').then(m => m.MedicalAgreementsModule),
    data: { title: 'Acuerdos medicos' }
  }

];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})

export class AppRoutingModule {};
