import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { DynamicDialogRef } from 'primeng/dynamicdialog';
import { GetParameterByIdUseCase } from 'src/app/application/utils/get-parameter-by-id.usecase';
import { ResponseData } from 'src/app/domain/response/global-response';
import { ParameterResponse } from 'src/app/domain/response/parameter.response';

@Component({
  selector: 'app-approval-modal',
  templateUrl: './approval-modal.component.html',
  styleUrls: ['./approval-modal.component.scss']
})
export class ApprovalModalComponent implements OnInit {

  approvalDataForm!: FormGroup
  statusList: any

  constructor(
    private _formBuilder: FormBuilder,
    private _dialogRef: DynamicDialogRef,
    private _getParameterById: GetParameterByIdUseCase
  ) { }

  ngOnInit() {
    this.createApprovalForm();
    this.getStatusAgreement();
  }

  createApprovalForm() {
    this.approvalDataForm = this._formBuilder.group({
      status: [null],
      description: [null],
    });
  }

  async getStatusAgreement() {
    try {
      const response: ResponseData<ParameterResponse[]> = await this._getParameterById.execute(3);
      this.statusList =  response.data
    } catch (error) {
      console.log(error)
    }
  }

  click(event: any) {
    console.log(event)
  }

}
