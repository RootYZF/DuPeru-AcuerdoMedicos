import { Component, OnInit } from '@angular/core';
import { GetOldUnregisteredProductUsercase } from 'src/app/application/products/get-old.unregistered-products.usecase';
import { ProductModel } from 'src/app/domain/models/product.model';
import { ResponseData } from 'src/app/domain/response/global-response';

@Component({
  selector: 'app-previous-unregistered-products',
  templateUrl: './previous-unregistered-products.component.html',
  styleUrls: ['./previous-unregistered-products.component.scss']
})
export class PreviousUnregisteredProductsComponent implements OnInit {

  oldUnregisteredProductList: ProductModel[] = [];

  constructor(
    private getOldUnregisteredProduct: GetOldUnregisteredProductUsercase
  ) { }

  async ngOnInit() {
    await this.getOldUnregisteredProductList();
  }

  async getOldUnregisteredProductList() {
    const response: ResponseData<ProductModel[]> = await this.getOldUnregisteredProduct.execute();
    this.oldUnregisteredProductList = response.data;
  }

}
