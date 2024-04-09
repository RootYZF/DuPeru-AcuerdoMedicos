import { medicalAgreementCreateModel } from "../../models/medical-agreement.model";
import { ResponseData } from "../../response/global-response";
import { MedicalAgreementResponse } from "../../response/medical-agreement.response";

export abstract class AgreementRequestRespository {

    abstract getAgreementRequest(): Promise<ResponseData<void>>;
    abstract postMedicalAgreement(request: medicalAgreementCreateModel): Promise<ResponseData<MedicalAgreementResponse>>;
}
