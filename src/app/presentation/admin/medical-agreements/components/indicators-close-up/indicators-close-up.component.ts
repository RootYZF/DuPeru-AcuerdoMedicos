import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { NumberOfPaymentsComponent } from './number-of-payments/number-of-payments.component';
import { DialogService } from 'primeng/dynamicdialog';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { GetParameterByIdUseCase } from 'src/app/application/utils/get-parameter-by-id.usecase';
import { ParameterResponse } from 'src/app/domain/response/parameter.response';
import { ResponseData } from 'src/app/domain/response/global-response';
import { InputNumber } from 'primeng/inputnumber';
import { AlertService } from 'src/app/shared/services/alert.service';
import { CommunicationMedicalAgreementService } from 'src/app/shared/helpers/services/comunication-medical-agreement.service';
import { Subscription } from 'rxjs';
import { ValidateInputService } from 'src/app/shared/services/validate-input.service';
import { ProductMedicalCloseUpModel } from 'src/app/domain/models/product-medical-close-up.model';

@Component({
  selector: 'app-indicators-close-up',
  templateUrl: './indicators-close-up.component.html',
  styleUrls: ['./indicators-close-up.component.scss']
})
export class IndicatorsCloseUpComponent implements OnInit, OnDestroy {
  @ViewChild('initial_disbursement') initialDisbursementInput!: InputNumber;

  indicatorsCloseUpForm!: FormGroup;
  indicatorsCloseUpTamForm!: FormGroup
  paymentsNumber!: string
  typeCurrency : any[] = []
  payments: any[] = [];
  isDollarSelected: boolean = false
  totalCompiteDestroy!: Subscription
  totalPxDestroy!: Subscription
  getSelectedProductsDestroy!: Subscription
  getProductListDestroy!: Subscription

  constructor(
    public dialogService: DialogService,
    private _formBuilder: FormBuilder,
    private _getParameterById: GetParameterByIdUseCase,
    private alertService: AlertService,
    private _communicationService: CommunicationMedicalAgreementService,
    public validateService: ValidateInputService,
    private _fb: FormBuilder,
  ) {
    this.getSelectedProduct()
    this.onGetForm();
    this.setProductListItems();
   }

  async ngOnInit() {
    this.createIndicatorsCloseUp();
    this.createIndicatorsCloseUpTam();
    this.getTypeCurrency();
    for (let i = 1; i <= 12; i++) {
      this.payments.push({
        description: i.toString(),
        value: i,
      });
    }
    this.onEventChangeInputs()
  }

  ngOnDestroy(): void {
    if(this.totalCompiteDestroy) this.totalCompiteDestroy.unsubscribe();
    if(this.totalPxDestroy) this.totalPxDestroy.unsubscribe()
    if(this.getSelectedProductsDestroy) this.getSelectedProductsDestroy.unsubscribe()
    if(this.getProductListDestroy) this.getProductListDestroy.unsubscribe()
  }

  createIndicatorsCloseUp() {
    this.indicatorsCloseUpForm = this._formBuilder.group({
      assessment: [0, Validators.required],
      investment: [0, Validators.required],
      type_currency: [null, Validators.required],
      payment_number: [null, Validators.required],
      initial_disbursement: [0],
      total_objetives: [0, Validators.required],
      total: [0, Validators.required],
      paymentsDataList: this._fb.array([]),
    });
  }

  createIndicatorsCloseUpTam() {
    this.indicatorsCloseUpTamForm = this._formBuilder.group({
      total_compete: [null],
      total_px: [null],
      own: [null],
      negotiated: [null],
      current_duperu: [null],
      to_achieve: [null],
      to_reach_monthly: [null],
      previous_goal: [0],
      objective_one: [null],
      objective_two: [null],
      objective_three: [null],
      objective_four: [null],
      comment: [null],
      //new cambios
      total_value: [null],
      medical_prescription_value: [null],
      own_recipe_value: [null],
      balance_payable: [null],
      to_value_reach: [null],
      previous_value_goal: [0],
      objective_value_one: [null],
      objective_value_two: [null],
      objective_value_three: [null],
      objective_value_four: [null],
      to_value_reach_monthly: [null],
    });
  }

  get paymentsDataArray() {
    return this.indicatorsCloseUpForm.get('paymentsDataList') as FormArray;
  }

  onEventChangeInputs() {
    const totalCompeteControl = this.indicatorsCloseUpTamForm.get('total_compete');
    const totalPxControl = this.indicatorsCloseUpTamForm.get('total_px');

  if (totalCompeteControl) {
    this.totalCompiteDestroy = totalCompeteControl.valueChanges.subscribe(async (valor: string) => {
      this.calcPercentages();
    });
  }

  if(totalPxControl) {
    this.totalPxDestroy = totalPxControl.valueChanges.subscribe(async (valor: string) => {
      this.calcPercentages();
    });
  }

  }

  async getTypeCurrency() {
    try {
      const response: ResponseData<ParameterResponse[]> = await this._getParameterById.execute(4);
      this.typeCurrency =  response.data
      const SOL = this.typeCurrency.find((item: any) => item.id === 13)
      this.indicatorsCloseUpForm.get('type_currency')?.setValue(SOL)
    } catch (error) {
      console.log(error)
    }
  }

  selectCurrencyType() {
    const currency = this.indicatorsCloseUpForm.get('type_currency')?.value
    const currencyTypeSelected = this.typeCurrency.find(f => f.id === currency.id)
    currencyTypeSelected.description === 'SOLES'? this.isDollarSelected = false : this.isDollarSelected = true
  }

  selectPaymentNumber() {
    const paymentNumbers = this.indicatorsCloseUpForm.get('payment_number')?.value?.description
    this.paymentsNumber = paymentNumbers
    if(paymentNumbers) {
      this.indicatorsCloseUpForm.removeControl('paymentsDataList')
      this.indicatorsCloseUpForm.addControl('paymentsDataList', this._fb.array([]))
      this.paymentsDataArray.setValue([]);
      this.indicatorsCloseUpForm.get('total_objetives')?.reset()
      this.openModalNumberOfPayments()
    }
  }

  openModalNumberOfPayments() {
    const paymentNumbers = this.indicatorsCloseUpForm.get('payment_number')?.value?.description
    if(paymentNumbers) {
      const ref = this.dialogService.open(NumberOfPaymentsComponent, {
        header: `CANTIDAD DE PAGOS: ${paymentNumbers?.length === 1 ? '0' + paymentNumbers : paymentNumbers}`,
          width: '40rem',
          data : {
            payments : paymentNumbers,
            paymentsArray: this.paymentsDataArray,
            isDollarSelected: this.isDollarSelected
          }
      });

      ref.onClose.subscribe((payments) => {
        if(payments) {
          this.indicatorsCloseUpForm.removeControl('paymentsDataList')
          this.indicatorsCloseUpForm.addControl('paymentsDataList', this._fb.array([]))
          this.paymentsDataArray.setValue([]);
          payments.forEach((form: any) => {
            this.paymentsDataArray.push(form)
          })
          this.calcTotal()
        }
      })
    }
  }

  calcTotal(){
    let totalPayments = 0
    this.paymentsDataArray.controls.forEach((form: any) => {
      totalPayments = totalPayments + Number(form.get('payment').value || 0)
    });

    const initialDisbursement = (this.indicatorsCloseUpForm.get('initial_disbursement')?.value || 0)
    const total = totalPayments + Number(initialDisbursement)
    this.indicatorsCloseUpForm.get('total_objetives')?.setValue(totalPayments)
    this.indicatorsCloseUpForm.get('total')?.setValue(total)


    const own_recipe_value = (this.indicatorsCloseUpTamForm.get('own_recipe_value')?.value || 0)
    const balance_payable =  Number(own_recipe_value) - Number(initialDisbursement)
    this.indicatorsCloseUpTamForm.get('balance_payable')?.setValue(balance_payable)
  }

  calcPercentages() {
    const totalCompete = (this.indicatorsCloseUpTamForm.get('total_compete')?.value || 0)
    const totalPx = (this.indicatorsCloseUpTamForm.get('total_px')?.value || 0)

    let totalNegociated = (totalCompete / totalPx) * 100
    const currentDuperu = (this.indicatorsCloseUpTamForm.get('current_duperu')?.value || 0)
    const toAchieve = totalNegociated - Number(currentDuperu)
    let toReachMonthly  = toAchieve / 12
    let objective_one   = (toReachMonthly * 3)+ currentDuperu
    let objective_two   = (toReachMonthly * 6)+ currentDuperu
    let objective_three = (toReachMonthly * 9)+ currentDuperu
    let objective_four  = (toReachMonthly * 12)+ currentDuperu


    if((totalNegociated !== Infinity)) {
      this.indicatorsCloseUpTamForm.get('negotiated')?.setValue((totalNegociated || 0))
      this.indicatorsCloseUpTamForm.get('to_achieve')?.setValue((toAchieve || 0))
      this.indicatorsCloseUpTamForm.get('to_reach_monthly')?.setValue((toReachMonthly || 0))
      this.indicatorsCloseUpTamForm.get('objective_one')?.setValue((objective_one || 0))
      this.indicatorsCloseUpTamForm.get('objective_two')?.setValue((objective_two || 0))
      this.indicatorsCloseUpTamForm.get('objective_three')?.setValue((objective_three || 0))
      this.indicatorsCloseUpTamForm.get('objective_four')?.setValue((objective_four || 0))


    }
  }

  getSelectedProduct() {
    this.getSelectedProductsDestroy = this._communicationService.getSelectedProducts().subscribe((data: any) => {
      let assessment = 0
      let totalCompete = 0
      let medical_prescription_value = 0

      data.forEach((element: ProductMedicalCloseUpModel) => {
        assessment += element.isChecked? element.total_value / 2: element.total_value
        totalCompete  += element.isChecked? element.compete / 2: element.compete
        medical_prescription_value += element.isChecked?  element.doctor_prescription_value / 2: element.doctor_prescription_value
      });


      this.indicatorsCloseUpTamForm.get('total_value')?.setValue((assessment))
      assessment = (assessment * 4)
      this.indicatorsCloseUpForm.get('assessment')?.setValue((assessment))


      let investment = (assessment * 15) / 100
      this.indicatorsCloseUpForm.get('investment')?.setValue(investment)
      this.indicatorsCloseUpTamForm.get('total_compete')?.setValue(totalCompete)

      let totalPxValue = this.indicatorsCloseUpTamForm.get('total_px')?.value
      let ownValue  = this.indicatorsCloseUpTamForm.get('own')?.value
      let currentDuPeru = ownValue / totalPxValue

      this.indicatorsCloseUpTamForm.get('current_duperu')?.setValue((currentDuPeru || 0))
      //Calculo valor receta medico de cada producto seleccionado
      this.indicatorsCloseUpTamForm.get('medical_prescription_value')?.setValue(medical_prescription_value)
      let own_recipe_value = this.indicatorsCloseUpTamForm.get('own_recipe_value')?.value

      console.log('own_recipe_value', own_recipe_value)
      console.log('medical_prescription_value', medical_prescription_value)
      let to_value_reach = medical_prescription_value - own_recipe_value
      this.indicatorsCloseUpTamForm.get('to_value_reach')?.setValue((to_value_reach || 0))

      let to_value_reach_monthly = (to_value_reach / 12)
      this.indicatorsCloseUpTamForm.get('to_value_reach_monthly')?.setValue((to_value_reach_monthly || 0))

      let objective_value_one   = (to_value_reach_monthly * 3) + Number(own_recipe_value)
      let objective_value_two   = (to_value_reach_monthly * 6) + Number(own_recipe_value)
      let objective_value_three = (to_value_reach_monthly * 9) + Number(own_recipe_value)
      let objective_value_four  = (to_value_reach_monthly * 12) + Number(own_recipe_value)
      this.indicatorsCloseUpTamForm.get('objective_value_one')?.setValue((objective_value_one || 0))
      this.indicatorsCloseUpTamForm.get('objective_value_two')?.setValue((objective_value_two || 0))
      this.indicatorsCloseUpTamForm.get('objective_value_three')?.setValue((objective_value_three || 0))
      this.indicatorsCloseUpTamForm.get('objective_value_four')?.setValue((objective_value_four || 0))
    });
  }

  setProductListItems() {
    this.getProductListDestroy = this._communicationService.getProductList().subscribe((data)=> {
      let total_px = 0
      let own = 0
      let own_recipe_value = 0

      data.forEach((element: any) => {
        total_px +=  element.px_total
        own  += element.own
        own_recipe_value += element.own_medical_prescription_value
      });

      this.indicatorsCloseUpTamForm.get('total_px')?.setValue(total_px || 0)
      this.indicatorsCloseUpTamForm.get('own')?.setValue(own || 0)
      this.indicatorsCloseUpTamForm.get('own_recipe_value')?.setValue(own_recipe_value || 0)
      let initialDisbursement = (this.indicatorsCloseUpForm.get('initial_disbursement')?.value || 0)
      let balance_payable =  Number(own_recipe_value) - Number(initialDisbursement)
      this.indicatorsCloseUpTamForm.get('balance_payable')?.setValue(balance_payable || 0)

    })
  }

  selectValue(event: any) {
    const input =  event.input.nativeElement

    if(event.value !== null) {
      input.setSelectionRange(0,250)
    }
  }

  onGetForm() {
    this._communicationService.getNotifyForm().subscribe(()=> {
      this.indicatorsCloseUpForm.markAllAsTouched();
      this._communicationService.setIndicatorsCloseUpDataFormCreate(this.indicatorsCloseUpForm);
      this._communicationService.setIndicatorsCloseUpTamDataFormCreate(this.indicatorsCloseUpTamForm);
    })
  }
}
