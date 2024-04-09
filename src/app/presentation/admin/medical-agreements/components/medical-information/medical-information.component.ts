import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators} from '@angular/forms';
import { Router } from '@angular/router';
import { NullValidationHandler } from 'angular-oauth2-oidc';
import { ConfirmationService } from 'primeng/api';
import { GetDoctorstUsecase } from 'src/app/application/doctors/get-doctors.usecase';
import { GetUsersUseCase } from 'src/app/application/users/get-users.usecase';
import { GetParameterByIdUseCase } from 'src/app/application/utils/get-parameter-by-id.usecase';
import { DoctorsModel } from 'src/app/domain/models/doctors.model';
import { UsersModel } from 'src/app/domain/models/users.model';
import { ResponseData } from 'src/app/domain/response/global-response';
import { ParameterResponse } from 'src/app/domain/response/parameter.response';
import { CommunicationMedicalAgreementService } from 'src/app/shared/helpers/services/comunication-medical-agreement.service';
import { ValidateInputService } from 'src/app/shared/services/validate-input.service';
@Component({
  selector: 'app-medical-information',
  templateUrl: './medical-information.component.html',
  styleUrls: ['./medical-information.component.scss']
})
export class MedicalInformationComponent implements OnInit {
  @ViewChild('agreement_number') agreementNumberInput!: ElementRef<HTMLInputElement>;


  medicalInformationForm!: FormGroup
  doctorsList: DoctorsModel[] = []
  currentYear: number = new Date().getFullYear();
  currentDate : Date = new Date();
  finishDate :  Date = new Date(this.currentDate.getFullYear() + 1, this.currentDate.getMonth(), this.currentDate.getDate())

  paymentsType: any
  renovationType: any
  isAgreementNumber: boolean = false
  ismodeUpdate = false
  constructor(
    private _formBuilder: FormBuilder,
    private _getDoctors: GetDoctorstUsecase,
    private _getParameterById: GetParameterByIdUseCase,
    private _communicationService: CommunicationMedicalAgreementService,
    public validateService: ValidateInputService,
    private _confirmationService: ConfirmationService,
    private router: Router,
  ) {
    this.onGetForm();
  }

  async ngOnInit() {
    await this.createIncidentDataForm();
    this.getDoctorsList();
    this.getPaymentsType();
    this.getRenovationType();
  }

  createIncidentDataForm() {
    this.medicalInformationForm = this._formBuilder.group({
      agreement_year: [this.currentYear],
      agreement_number: [null, Validators.maxLength(8)],
      aplication_date: [this.currentDate, Validators.required],
      doctor_name: [null, Validators.required],
      code_sap: [{ value: null, disabled: true }],
      specialty: [{ value: null, disabled: true }],
      cmp: [{ value: null, disabled: true }],
      category: [{ value: null, disabled: true }],
      local_address: [null, Validators.required],
      local_district: [null, Validators.required],
      start_date: [this.currentDate, Validators.required],
      finish_date: [this.finishDate, Validators.required],
      previous_contract_end_date: [{ value: null, disabled: true }],
      way_to_pay: [null, Validators.required],
      renovation: [{value :null ,disabled: true}],
      previous_contract_count: [{ value: null, disabled: true }]
    });
   }

  async getDoctorsList() {
    const user = 'user@duperu.com'
    const response: ResponseData<DoctorsModel[]> = await this._getDoctors.execute(user);
    this.doctorsList = response.data;
  }

  async getPaymentsType() {
    try {
      const response: ResponseData<ParameterResponse[]> = await this._getParameterById.execute(1)
      this.paymentsType =  response.data
    } catch (error) {
      console.log(error)
    }
  }

  async getRenovationType() {
    try {
      const response: ResponseData<ParameterResponse[]> = await this._getParameterById.execute(2);
      this.renovationType =  response.data
    } catch (error) {
      console.log(error)
    }
  }

  changeDoctor() {
    const value = this.medicalInformationForm.get('doctor_name')?.value

    if(!value) return;
    this.medicalInformationForm.patchValue(value)
    this._communicationService.sendNotifyChangeDoctor(value.code_closeup)
  }

  autoCompleteAgreementNumber(event: any) {

    const agreementNumber = this.medicalInformationForm.get('agreement_number');
    let value = agreementNumber?.value;

    if(!event.data && value.length > 8 ) {
      event.preventDefault();
      return
    }

    value = value.replace(/^0+/, '');

    while (value.length < 8) {
      value = '0' + value;
    }

    if(value.length > 8) {
      value = value.substr(1, 9)
    }

    if(value === '00000000') {
      agreementNumber?.setValue(null);
      return;
    }
    agreementNumber?.setValue(value);
  }

  selectValue(event: any) {
    if(event.value !== null) {
      this.agreementNumberInput.nativeElement.setSelectionRange(0,10)
    }
  }

  setDate(event: any) {
    const finishDate: Date = new Date(event.getFullYear() + 1, event.getMonth(), event.getDate());
    this.medicalInformationForm.get('finish_date')?.setValue(finishDate);
  }


  onGetForm() {
    this._communicationService.getNotifyForm().subscribe(()=> {
      this.medicalInformationForm.markAllAsTouched()
      this._communicationService.setMedicalInformationDataFormCreate(this.medicalInformationForm);
    })
  }

  keyEnterAgreement_number(event: any){

    if(this.isAgreementNumber){
      return false;
    }

    this.isAgreementNumber = true;
    setTimeout(() => {
      this.isAgreementNumber = false
    }, 170);

    const agreementNumber = this.medicalInformationForm.get('agreement_number')?.value

    if(agreementNumber){
      this.agreementNumberInput.nativeElement.blur();
      this.medicalAgreementNumber();

    }

    return true;

  }

  async medicalAgreementNumber(){


  }



  reloadPage() {
    this._confirmationService.confirm({
      header: "Confirmar",
      message: "¿Desea salir de este acuerdo medico?",
      accept: () => {
        this.ismodeUpdate = false
        this.router.routeReuseStrategy.shouldReuseRoute = () => false;
        const currentUrl = this.router.url + '?';
        this.router.navigateByUrl(currentUrl)
          .then(() => {
            this.router.navigated = false;
            this.router.navigate([this.router.url]);
          });
      },
    });
  }

}
