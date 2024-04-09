
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { lastValueFrom } from 'rxjs';
import { ResponseData } from "src/app/domain/response/global-response";
import { ProductsMedicalRepository } from "src/app/domain/repository/products/products-medical.repository";
import { ProductMedicalCloseUpModel } from 'src/app/domain/models/product-medical-close-up.model';
import { DU_PERU_URL } from 'src/app/shared/helpers/constants/url.constants';
@Injectable({
  providedIn: 'root'
})
export class ProductsMedicalWebRepository implements ProductsMedicalRepository {

  constructor(
    private http: HttpClient
  ) {


  }

  getCurrentProductsMedicalCloseUp(codedoctor?: string | undefined): Promise<ResponseData<ProductMedicalCloseUpModel[]>> {

    const url = `${DU_PERU_URL}/listmedicalproductindicator?codecloseupdoctor=${codedoctor}`;
    return lastValueFrom(this.http.get<ResponseData<ProductMedicalCloseUpModel[]>>(url));

  }

}


