import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';
import { Subscription } from 'rxjs';
import { GetCurrentProductUsercase } from 'src/app/application/products/get-current-products.usecase';
import { GetProductsMedicalCloseUpUseCase } from 'src/app/application/products/get-products-medical-close-up.usecase';
import { ProductMedicalCloseUpModel } from 'src/app/domain/models/product-medical-close-up.model';
import { ProductModel } from 'src/app/domain/models/product.model';
import { ResponseData } from 'src/app/domain/response/global-response';
import { ParameterResponse } from 'src/app/domain/response/parameter.response';
import { CommunicationMedicalAgreementService } from 'src/app/shared/helpers/services/comunication-medical-agreement.service';
import { AlertService } from 'src/app/shared/services/alert.service';

@Component({
  selector: 'app-current-products',
  templateUrl: './current-products.component.html',
  styleUrls: ['./current-products.component.scss']
})
export class CurrentProductsComponent implements OnInit {

  productForm!: FormGroup;

  getNotifyChangeDoctorSuscription !: Subscription;
  //currentProductList: ProductModel[] = [];
  currentProductSelected: ProductModel[] = [];
  productsMedicalCloseUpSelected: ProductMedicalCloseUpModel[] = [];
  productsMedicalCloseUpList: ProductMedicalCloseUpModel[]=[];


  constructor(
    private _formBuilder: FormBuilder,
    private _getCurrentProducts: GetCurrentProductUsercase,
    private _communicationService: CommunicationMedicalAgreementService,
    private _getProductsMedicalCloseUp: GetProductsMedicalCloseUpUseCase,
    private alertService: AlertService,
    private _fb: FormBuilder,
  ) {
    this.OnchangeDoctor();
    this.onGetForm()
  }

  async ngOnInit() {
    this.initProductForm();
  }

  ngOnDestroy() {
    if(this.getNotifyChangeDoctorSuscription) this.getNotifyChangeDoctorSuscription.unsubscribe();
  }

  initProductForm() {
    this.productForm = this._formBuilder.group({
      product_list_selected: this._fb.array([]),
    })
  }

  get paymentsDataArray() {
    return this.productForm.get('product_list_selected') as FormArray;
  }

  OnchangeDoctor() {
    this.getNotifyChangeDoctorSuscription = this._communicationService.getNotifyChangeDoctor().subscribe(async(data) => {
      await this.getPrductsMedical(data);
    })
  }

  async getPrductsMedical(codedoctor : string) {
    try {
      const response: ResponseData<ProductMedicalCloseUpModel[]> = await this._getProductsMedicalCloseUp.execute(codedoctor);
      this.productsMedicalCloseUpList = response.data.sort((a, b) => b.doctor_prescription_value - a.doctor_prescription_value);
      this.productsMedicalCloseUpSelected = []
      this._communicationService.setSelectedProducts(this.productsMedicalCloseUpSelected);
      this._communicationService.setProductList(this.productsMedicalCloseUpList);
    } catch (error) {
      console.log(error)
    }
  }

  addProduct(product: ProductMedicalCloseUpModel) {
    if(!product) return;

    let isRegisteredProduct = false;

    this.productsMedicalCloseUpSelected.forEach(item => {
      if (item.id === product.id) {
        isRegisteredProduct = true;
      }
    });

    if (isRegisteredProduct) {
      this.alertService.warn("Este producto ya fue registrado")
      return
    }

    product.isChecked = false
    this.productsMedicalCloseUpSelected.push(product);
    this._communicationService.setSelectedProducts(this.productsMedicalCloseUpSelected);
  }

  removeProduct(index: number) {
    this.productsMedicalCloseUpSelected.splice(index, 1)
    this._communicationService.setSelectedProducts(this.productsMedicalCloseUpSelected);
  }

  onGetForm() {
    this._communicationService.getNotifyForm().subscribe(() => {
      this.productForm.removeControl('product_list_selected');
      this.productForm.addControl('product_list_selected', this._fb.array([]));
      this.paymentsDataArray.setValue([]);

      const productFormArray = this.productForm.get('product_list_selected') as FormArray;

      this.productsMedicalCloseUpSelected.forEach(form => {
        const newFormGroup = this._fb.group({
          product_id: [form.id]
        });

        productFormArray.push(newFormGroup);
      });

      this._communicationService.setCurrentProductsSelectedDataForm(this.productForm);
    });
  }

  changePercentage(ischeked: boolean, product: ProductMedicalCloseUpModel) {
    product.isChecked = ischeked
    this._communicationService.setSelectedProducts(this.productsMedicalCloseUpSelected);
  }
  
}
