import { Injectable } from "@angular/core";
import { UseCasePromise } from "src/app/domain/base/use-case-promise";
import { medicalAgreementCreateModel } from "src/app/domain/models/medical-agreement.model";
import { AgreementRequestRespository } from "src/app/domain/repository/requests/agreement-requests.repository";
import { ResponseData } from "src/app/domain/response/global-response";
import { MedicalAgreementResponse } from "src/app/domain/response/medical-agreement.response";


@Injectable({
  providedIn: 'root'
})

export class CreateAgreementRequestUsercase implements UseCasePromise<medicalAgreementCreateModel, MedicalAgreementResponse>{

  constructor(private _repository: AgreementRequestRespository) { }
  execute(params: medicalAgreementCreateModel): Promise<ResponseData<MedicalAgreementResponse>> {

    return this._repository.postMedicalAgreement(params);

  }


}
