import { DoctorsModel } from "../../models/doctors.model";
import { ResponseData } from "../../response/global-response";

export abstract class DoctorsRespository {

    abstract getDoctorsByUser(user: string): Promise<ResponseData<DoctorsModel[]>>;
}
