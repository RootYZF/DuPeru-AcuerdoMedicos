import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { GetCurrentUnregisteredtProductUsecase } from 'src/app/application/products/get-current-unregistered-products.usecase';
import { ProductModel } from 'src/app/domain/models/product.model';
import { ResponseData } from 'src/app/domain/response/global-response';

@Component({
  selector: 'app-current-unregistered-products',
  templateUrl: './current-unregistered-products.component.html',
  styleUrls: ['./current-unregistered-products.component.scss']
})
export class CurrentUnregisteredProductsComponent implements OnInit {

  productUnregisteredForm!: FormGroup;

  currentUnregisteredProductList: ProductModel[] = [];
  currentUnregisteredProductSelected: ProductModel[] = [];

  constructor(
    private _formBuilder: FormBuilder,
    private _getCurrentUnregisteredProducts: GetCurrentUnregisteredtProductUsecase
  ) { }

  async ngOnInit() {
    this.initUnregisteredProductForm();
    await this.getCurrentProductsList();
  }

  initUnregisteredProductForm() {
    this.productUnregisteredForm = this._formBuilder.group({
      product: [null]
    })
  }

  async getCurrentProductsList() {
    try {
      const response: ResponseData<ProductModel[]> = await this._getCurrentUnregisteredProducts.execute();
      this.currentUnregisteredProductList = response.data;
    } catch (error) {
      console.error(error)
    }
  }

  addProduct() {
    const product = this.productUnregisteredForm.get('product')?.value;

    if(!product) return;
    this.currentUnregisteredProductSelected.push(product);
  }

  removeProduct(index: number) {
    this.currentUnregisteredProductSelected.splice(index, 1);
  }

}
