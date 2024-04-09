import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminRoutingModule } from './admin.routing';
import { MedicalAgreementsModule } from './medical-agreements/medical-agreements.module';

import { PrimeNGModule } from 'src/app/shared/primeng/primeng.module';
import { SharedModule } from 'primeng/api';
import { TableModule } from 'primeng/table';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ToolbarComponent } from 'src/app/shared/toolbar/toolbar.component';

@NgModule({
  imports: [
    CommonModule,
    AdminRoutingModule,
    TableModule,
    PrimeNGModule,
    SharedModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule
  ],
  declarations: [ToolbarComponent]
})
export class AdminModule { }
