import { ProductMedicalCloseUpModel } from "../../models/product-medical-close-up.model";
import { ResponseData } from "../../response/global-response";

export abstract class ProductsMedicalRepository {

  abstract getCurrentProductsMedicalCloseUp(codedoctor: string): Promise<ResponseData<ProductMedicalCloseUpModel[]>>;

}
