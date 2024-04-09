import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { GetUsersUseCase } from 'src/app/application/users/get-users.usecase';
import { UsersModel } from 'src/app/domain/models/users.model';
import { ResponseData } from 'src/app/domain/response/global-response';
import { CommunicationMedicalAgreementService } from 'src/app/shared/helpers/services/comunication-medical-agreement.service';
import { ValidateInputService } from 'src/app/shared/services/validate-input.service';

@Component({
  selector: 'app-authorization-agreement',
  templateUrl: './authorization-agreement.component.html',
  styleUrls: ['./authorization-agreement.component.scss']
})
export class AuthorizationAgreementComponent implements OnInit {

  uploadedFiles: any[] = [];
  authorizationAgreementForm!: FormGroup
  userSupervisorList: UsersModel[] = [];
  userAnalystList: UsersModel[] = [];

  constructor(
    private _formBuilder: FormBuilder,
    private _getUsers: GetUsersUseCase,
    private _communicationService: CommunicationMedicalAgreementService,   
    public validateService: ValidateInputService,

  ) {
    this.onGetForm()
  }

  async ngOnInit() {
    await  this.createAuthorizationAgreementDataForm();
    this.getUserSupervisorList();
    this.getUserAnalystList();
  }

  showFileExplorer(fileUpload: any) {
    fileUpload.advancedFileInput.nativeElement.click()
  }

  createAuthorizationAgreementDataForm(){
    this.authorizationAgreementForm = this._formBuilder.group({
      medical_visitor: [{ value: null, disabled: true }],
      commercial_analyst: [null],
      commercial_supervisor: [null],
    });
  }

  async getUserSupervisorList(){
    const idrol = 3
    const response: ResponseData<UsersModel[]> = await this._getUsers.execute(idrol);
    this.userSupervisorList = response.data;
  }

  async getUserAnalystList(){
    const idrol = 4
    const response: ResponseData<UsersModel[]> = await this._getUsers.execute(idrol);
    this.userAnalystList = response.data;
  }

  onGetForm() {  
    this._communicationService.getNotifyForm().subscribe(()=> {
      this._communicationService.setAuthorizationAgreementDataFormDataFormCreate(this.authorizationAgreementForm);
    })
  }

}
