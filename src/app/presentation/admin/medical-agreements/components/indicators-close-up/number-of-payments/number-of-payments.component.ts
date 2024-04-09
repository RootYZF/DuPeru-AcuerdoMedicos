import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { invalid } from 'src/app/shared/helpers/constants/alert.constants';
import { AlertService } from 'src/app/shared/services/alert.service';
import { ValidateInputService } from 'src/app/shared/services/validate-input.service';

@Component({
  selector: 'app-number-of-payments',
  templateUrl: './number-of-payments.component.html',
  styleUrls: ['./number-of-payments.component.scss']
})
export class NumberOfPaymentsComponent implements OnInit {

  paymentsFormArray!: FormArray;
  paymentsNumber:number =  Number(this._config.data.payments)
  isDollarSelected: boolean = this._config.data.isDollarSelected
  constructor(
    private _config: DynamicDialogConfig,
    private _formBuilder: FormBuilder,
    private _dialogRef: DynamicDialogRef,
    private alertService: AlertService,
    public validateService: ValidateInputService,
    private _fb: FormBuilder,
  ) {}

  ngOnInit(): void {
    this.initFormNumberPaymentsData();
  }

  initFormNumberPaymentsData() {
    this.paymentsFormArray = this._fb.array([])
    if(this._config.data.paymentsArray.controls.length) {
      this._config.data.paymentsArray.controls.forEach((form: any) => {
        const newForm = this._fb.group({
          payment_number: [form.get('payment_number').value],
          payment: [form.get('payment').value, Validators.required],

        })
        this.paymentsDataArray.push(newForm)
      });
    }else {
      for (let i = 0; i < this.paymentsNumber; i++) {
        this.addFormArrayItems(i);
      }
    }
  }

  get paymentsDataArray() {
    return this.paymentsFormArray as FormArray;
  }

  addFormArrayItems(index: number) {
    const form = this._fb.group({
      payment_number: [(index + 1)],
      payment: [null, Validators.required],
    })
    this.paymentsFormArray.push(form);
    this.paymentsFormArray.controls = [...this.paymentsFormArray.controls]
  }

  getPaymentsForm(form: any) {
    return form as FormGroup;
  }

  savePayments() {
    if (this.paymentsFormArray.invalid) {
      this.alertService.warn(invalid)
      this.paymentsFormArray.markAllAsTouched()
      return
    }
    this._dialogRef.close(this.paymentsFormArray.controls)
  }
}
