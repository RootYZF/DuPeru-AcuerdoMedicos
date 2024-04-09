import { Component, OnInit } from '@angular/core';
import { GetOldProductUsercase } from 'src/app/application/products/get-old-products.usecase';
import { ProductModel } from 'src/app/domain/models/product.model';
import { ResponseData } from 'src/app/domain/response/global-response';

@Component({
  selector: 'app-previous-products',
  templateUrl: './previous-products.component.html',
  styleUrls: ['./previous-products.component.scss']
})
export class PreviousProductsComponent implements OnInit {

  oldProductList: ProductModel[] = [];

  constructor(
    private getOldProduct: GetOldProductUsercase
  ) { }

  async ngOnInit() {
    await this.getOldProductList();
  }


  async getOldProductList() {
    const response: ResponseData<ProductModel[]> = await this.getOldProduct.execute();
    this.oldProductList = response.data;
  }

}
