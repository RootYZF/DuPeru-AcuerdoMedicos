import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ManageApprovalAgreementComponent } from './manage-approval-agreement/manage-approval-agreement.component';
import { ApprovalAgreementRoutingModule } from './approval-agreement.routing';
import { TableModule } from 'primeng/table';
import { SharedModule } from 'primeng/api';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PrimeNGModule } from 'src/app/shared/primeng/primeng.module';
import { ApprovalModalComponent } from './manage-approval-agreement/components/approval-modal/approval-modal.component';

const components = [
  ManageApprovalAgreementComponent,
  ApprovalModalComponent
]
@NgModule({
  imports: [
    CommonModule,
    ApprovalAgreementRoutingModule,
    TableModule,
    PrimeNGModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule
  ],
  declarations: [components]
})
export class ApprovalAgreementModule { }
