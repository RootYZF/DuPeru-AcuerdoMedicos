import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MedicalInformationComponent } from './components/medical-information/medical-information.component';
import { MedicalAgreementsRoutingModule } from './medical-agreements.routing';
import { IndicatorsCloseUpComponent } from './components/indicators-close-up/indicators-close-up.component';
import { MedicalAgreementsComponent } from './components/medical-agreements.component';
import { TableModule } from 'primeng/table';
import { PrimeNGModule } from 'src/app/shared/primeng/primeng.module';
import { CurrentProductsComponent } from './components/current-products/current-products.component';
import { PreviousProductsComponent } from './components/previous-products/previous-products.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CurrentUnregisteredProductsComponent } from './components/current-unregistered-products/current-unregistered-products.component';
import { PreviousUnregisteredProductsComponent } from './components/previous-unregistered-products/previous-unregistered-products.component';
import { AuthorizationAgreementComponent } from './components/authorization-agreement/authorization-agreement.component';
import { NumberOfPaymentsComponent } from './components/indicators-close-up/number-of-payments/number-of-payments.component';
import { SharedModule } from 'src/app/shared/shared.module'; 


const components = [
  MedicalInformationComponent,
  NumberOfPaymentsComponent,
  IndicatorsCloseUpComponent,
  MedicalAgreementsComponent,
  IndicatorsCloseUpComponent,
  CurrentProductsComponent,
  PreviousProductsComponent,
  IndicatorsCloseUpComponent,
  CurrentUnregisteredProductsComponent,
  PreviousUnregisteredProductsComponent,
  AuthorizationAgreementComponent,
]
@NgModule({
  imports: [
    CommonModule,
    MedicalAgreementsRoutingModule,
    TableModule,
    PrimeNGModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule
  ],
  declarations: [components]
})
export class MedicalAgreementsModule { }
