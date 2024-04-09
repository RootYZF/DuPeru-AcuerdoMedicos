import { EventEmitter, Injectable } from '@angular/core';
import { GetComponent } from '../enums/components.enum';
import { GetStatusFormInterface } from 'src/app/domain/models/medical-agreement.model'

@Injectable({
    providedIn: 'root'
})

export class CommunicationMedicalAgreementService {
  private notifyForm: EventEmitter<string> = new EventEmitter();
  private notifyChangeDoctor: EventEmitter<string> = new EventEmitter();
  private selectedProducts: EventEmitter<any> = new EventEmitter();
  private productList: EventEmitter<any> = new EventEmitter();
  private medicalInformationDataForm: any;
  private indicatorsCloseUpDataForm: any;
  private indicatorsCloseUpTamDataForm: any;
  private currentProductsSelectedDataForm: any;
  private authorizationAgreementDataForm: any;

  sendNotifyChangeDoctor(data: any) {
    this.notifyChangeDoctor.emit(data);
  }

  getNotifyChangeDoctor() {
    return this.notifyChangeDoctor;
  }

  sendNotifyForm(data?: any) {
    this.notifyForm.emit(GetComponent.GET_DATA);
  }

  getNotifyForm() {
    return this.notifyForm;
  }

  setMedicalInformationDataFormCreate(data: any) {
    this.medicalInformationDataForm = data;
  }

  getmedicalInformationDataFormCreate() {
    return this.medicalInformationDataForm;
  }

  setIndicatorsCloseUpDataFormCreate(data: any) {
      this.indicatorsCloseUpDataForm = data;
  }

  getIndicatorsCloseUpDataFormCreate() {
    return this.indicatorsCloseUpDataForm;
  }

  setIndicatorsCloseUpTamDataFormCreate(data: any) {
    this.indicatorsCloseUpTamDataForm = data;
  }

  getIndicatorsCloseUpTamDataFormCreate() {
    return this.indicatorsCloseUpTamDataForm;
  }

  setCurrentProductsSelectedDataFormDataFormCreate(data: any) {
    this.authorizationAgreementDataForm = data;
  }

  getCurrentProductsSelectedDataFormDataFormCreate() {
    return this.authorizationAgreementDataForm;
  }

  setCurrentProductsSelectedDataForm(data: any) {
    this.currentProductsSelectedDataForm = data;
  }

  getCurrentProductsSelectedDataFormData() {
    return this.currentProductsSelectedDataForm;
  }

  setAuthorizationAgreementDataFormDataFormCreate(data: any) {
    this.authorizationAgreementDataForm = data;
  }

  getAuthorizationAgreementDataFormDataFormCreate() {
    return this.authorizationAgreementDataForm;
  }

  setSelectedProducts(data: any) {
    this.selectedProducts.emit(data)
  }

  getSelectedProducts() {
    return this.selectedProducts;
  }

  setProductList(data: any) {
    this.productList.emit(data)
  }

  getProductList() {
    return this.productList;
  }

}
