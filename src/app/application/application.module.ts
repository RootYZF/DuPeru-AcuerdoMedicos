import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AgreementRequestRespository } from '../domain/repository/requests/agreement-requests.repository';
import { AgreementRequestWebRepository } from '../infraestructure/requests/web/agreement-requests.web';
import { ProductRespository } from '../domain/repository/products/products.repository';
import { ProductWebRepository } from '../infraestructure/requests/mock/products.web.repository';
import { DoctorsRespository } from '../domain/repository/doctors/doctors.repository';
import { AuthRespository } from '../domain/repository/auth/auth.repository';
import { AuthWebRepository } from '../infraestructure/auth/web/login.web';
import { UtilstWebRepository } from '../infraestructure/requests/web/utils-web.repository';
import { UtilsRepository } from '../domain/repository/utils/utils.repository';
import { DoctorsWebRepository } from '../infraestructure/requests/web/doctors-web.repository';
import { UsersRepository } from '../domain/repository/users/users.repository';
import { UsersWebRepository } from '../infraestructure/requests/web/users-web.repository';
import { ProductsMedicalRepository } from '../domain/repository/products/products-medical.repository';
import { ProductsMedicalWebRepository } from '../infraestructure/requests/web/products-medical.web.repository';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [],
  providers: [
    { provide: AgreementRequestRespository, useClass: AgreementRequestWebRepository },
    { provide: ProductRespository, useClass: ProductWebRepository },
    { provide: ProductsMedicalRepository, useClass: ProductsMedicalWebRepository },
    { provide: DoctorsRespository, useClass: DoctorsWebRepository },
    { provide: UsersRepository, useClass: UsersWebRepository },
    { provide: AuthRespository, useClass: AuthWebRepository },
    { provide: UtilsRepository, useClass: UtilstWebRepository }
  ]
})
export class ApplicationModule { }
