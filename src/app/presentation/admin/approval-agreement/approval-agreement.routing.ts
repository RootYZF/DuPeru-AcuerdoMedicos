import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ManageApprovalAgreementComponent } from './manage-approval-agreement/manage-approval-agreement.component';

const routeDefault = '';

const routes: Routes = [
    {
        path: routeDefault,
        component: ManageApprovalAgreementComponent,
        title: 'Aprobacion de acuerdo'
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class ApprovalAgreementRoutingModule { }
