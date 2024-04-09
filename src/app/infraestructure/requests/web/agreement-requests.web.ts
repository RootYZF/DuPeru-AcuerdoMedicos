import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { lastValueFrom } from 'rxjs';
import { AgreementRequestRespository } from 'src/app/domain/repository/requests/agreement-requests.repository';
import { ResponseData } from 'src/app/domain/response/global-response';
import { medicalAgreementCreateModel } from 'src/app/domain/models/medical-agreement.model';
import { DU_PERU_URL } from 'src/app/shared/helpers/constants/url.constants';
import { MedicalAgreementResponse } from 'src/app/domain/response/medical-agreement.response';

@Injectable({
    providedIn: 'root'
})
export class AgreementRequestWebRepository implements AgreementRequestRespository {

    constructor(private http: HttpClient) {
     }



    postMedicalAgreement(request: medicalAgreementCreateModel): Promise<ResponseData<MedicalAgreementResponse>> {
    //throw new Error('Method not implemented.');
      const url = `${DU_PERU_URL}/createmedicalagreement`;
      return lastValueFrom(this.http.post<ResponseData<MedicalAgreementResponse>>(url,request))

  }

    getAgreementRequest(): Promise<ResponseData<void>> {
        return lastValueFrom(this.http.get<ResponseData<void>>(''));
    }

}
