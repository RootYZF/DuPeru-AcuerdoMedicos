import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { DialogService } from 'primeng/dynamicdialog';
import { ApprovalModalComponent } from './components/approval-modal/approval-modal.component';
import { DoctorsModel } from 'src/app/domain/models/doctors.model';
import { ResponseData } from 'src/app/domain/response/global-response';
import { GetDoctorstUsecase } from 'src/app/application/doctors/get-doctors.usecase';

@Component({
  selector: 'app-manage-approval-agreement',
  templateUrl: './manage-approval-agreement.component.html',
  styleUrls: ['./manage-approval-agreement.component.scss']
})
export class ManageApprovalAgreementComponent implements OnInit {

  selectedAgreement: any
  doctorsList: DoctorsModel[] = []
  agreementsList: any[] = [
    {
      id: 101,
      agreement: '876453657',
      agreement_date: '01/08/2024 00:00:00',
      doctor: 'Manuel cisneros prada',
      visitor: 'Estban manuel merino mendoza',
      status: '87876565',
    },
    {
      id: 102,
      agreement: '876453657',
      agreement_date: '01/08/2024 00:00:00',
      doctor: 'Roberto gomez bolañoz',
      visitor: 'Estban manuel merino mendoza',
      status: '87876565',
    },
    {
      id: 103,
      agreement: '876453657',
      agreement_date: '01/08/2024 00:00:00',
      doctor: 'Jorge ramos arana',
      visitor: 'Estban manuel merino mendoza',
      status: '87876565',
    },
    {
      id: 104,
      agreement: '876453657',
      agreement_date: '01/08/2024 00:00:00',
      doctor: 'Pamela medina gutierrez',
      visitor: 'Estban manuel merino mendoza',
      status: '87876565',
    },
    {
      id: 105,
      agreement: '876453657',
      agreement_date: '01/08/2024 00:00:00',
      doctor: 'Manuel cisneros prada',
      visitor: 'Estban manuel merino mendoza',
      status: '87876565',
    },
    {
      id: 106,
      agreement: '876453657',
      agreement_date: '01/08/2024 00:00:00',
      doctor: 'Roberto gomez bolañoz',
      visitor: 'Estban manuel merino mendoza',
      status: '87876565',
    },
    {
      id: 107,
      agreement: '876453657',
      agreement_date: '01/08/2024 00:00:00',
      doctor: 'Jorge ramos arana',
      visitor: 'Estban manuel merino mendoza',
      status: '87876565',
    },
    {
      id: 108,
      agreement: '876453657',
      agreement_date: '01/08/2024 00:00:00',
      doctor: 'Pamela medina gutierrez',
      visitor: 'Estban manuel merino mendoza',
      status: '87876565',
    },
    {
      id: 109,
      agreement: '876453657',
      agreement_date: '01/08/2024 00:00:00',
      doctor: 'Manuel cisneros prada',
      visitor: 'Estban manuel merino mendoza',
      status: '87876565',
    },
    {
      id: 110,
      agreement: '876453657',
      agreement_date: '01/08/2024 00:00:00',
      doctor: 'Roberto gomez bolañoz',
      visitor: 'Estban manuel merino mendoza',
      status: '87876565',
    },
    {
      id: 111,
      agreement: '876453657',
      agreement_date: '01/08/2024 00:00:00',
      doctor: 'Jorge ramos arana',
      visitor: 'Estban manuel merino mendoza',
      status: '87876565',
    },
    {
      id: 112,
      agreement: '876453657',
      agreement_date: '01/08/2024 00:00:00',
      doctor: 'Pamela medina gutierrez',
      visitor: 'Estban manuel merino mendoza',
      status: '87876565',
    },
  ]

  constructor(
    public dialogService: DialogService,
    private _getDoctors: GetDoctorstUsecase,
    private _formBuilder: FormBuilder,
  ) { }

  ngOnInit() {
    this.getDoctorsList();
  }

  async getDoctorsList() {
    const user = 'user@duperu.com'
    const response: ResponseData<DoctorsModel[]> = await this._getDoctors.execute(user);
    this.doctorsList = response.data;
  }

  openApprovalModal(data?: string) {
    const ref = this.dialogService.open(ApprovalModalComponent, {
      header: `APROBACIÓN`,
        width: '60rem',
        data : {
          payments : data
        }
    });

    ref.onClose.subscribe((payments) => {
      if(payments) {
  
      }
    })
  }

}
