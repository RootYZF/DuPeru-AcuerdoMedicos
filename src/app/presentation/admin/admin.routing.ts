import { NgModule } from "@angular/core";
import { RouterModule, Routes } from '@angular/router';
import { ToolbarComponent } from "src/app/shared/toolbar/toolbar.component";

const DEFAULT_ROUTE: string = ''

const routes: Routes = [
  {
    path: DEFAULT_ROUTE,
    component: ToolbarComponent,
    children: [
      {
        path: 'medical-agreements',
        loadChildren: () => import('./medical-agreements/medical-agreements.module').then(m => m.MedicalAgreementsModule)
      },
      {
        path: 'approval-agreement',
        loadChildren: () => import('./approval-agreement/approval-agreement.module').then(m => m.ApprovalAgreementModule)
      }
    ]
  }
]

@NgModule({
  imports: [RouterModule.forChild(routes)]
})

export class AdminRoutingModule { }