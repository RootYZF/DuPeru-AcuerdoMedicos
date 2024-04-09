import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MedicalAgreementsComponent } from './components/medical-agreements.component';

const routeDefault = '';

const routes: Routes = [
    {
        path: routeDefault,
        component: MedicalAgreementsComponent,
        title: 'Solicitudes de acuerdo'
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class MedicalAgreementsRoutingModule { }
