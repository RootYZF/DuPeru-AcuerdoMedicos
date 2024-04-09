import { Injectable } from "@angular/core";
import { UseCasePromise } from "src/app/domain/base/use-case-promise";
import { ProductMedicalCloseUpModel } from "src/app/domain/models/product-medical-close-up.model";
import { ProductsMedicalRepository } from "src/app/domain/repository/products/products-medical.repository";
import { ResponseData } from "src/app/domain/response/global-response";

@Injectable({
  providedIn: 'root'
})



export class GetProductsMedicalCloseUpUseCase implements UseCasePromise<string, ProductMedicalCloseUpModel[]>{

  constructor(private repository: ProductsMedicalRepository) { }

  execute(user: string): Promise<ResponseData<ProductMedicalCloseUpModel[]>> {
      return this.repository.getCurrentProductsMedicalCloseUp(user);
  }

}
