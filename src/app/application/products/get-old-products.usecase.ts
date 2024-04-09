
import { Injectable } from '@angular/core';
import { UseCasePromise } from 'src/app/domain/base/use-case-promise';
import { ProductModel } from 'src/app/domain/models/product.model';
import { ProductRespository } from 'src/app/domain/repository/products/products.repository';
import { ResponseData } from 'src/app/domain/response/global-response';

@Injectable({
    providedIn: 'root'
})
export class GetOldProductUsercase implements UseCasePromise<null, ProductModel[]>{

    constructor(private repository: ProductRespository) { }

    execute(): Promise<ResponseData<ProductModel[]>> {
        return this.repository.getOldProducts();
    }

}
