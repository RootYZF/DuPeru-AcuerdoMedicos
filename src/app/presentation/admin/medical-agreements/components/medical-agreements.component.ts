import { Component, OnInit } from '@angular/core';
import { DialogService } from 'primeng/dynamicdialog';
import { Subscription } from 'rxjs';
import { CreateAgreementRequestUsercase } from 'src/app/application/requests/create-agreement-request.usercase';
import { medicalAgreementCreateModel } from 'src/app/domain/models/medical-agreement.model';
import { ProductMedicalCloseUpModel } from 'src/app/domain/models/product-medical-close-up.model';
import { ResponseData } from 'src/app/domain/response/global-response';
import { MedicalAgreementResponse } from 'src/app/domain/response/medical-agreement.response';
import { invalid } from 'src/app/shared/helpers/constants/alert.constants';
import { CommunicationMedicalAgreementService } from 'src/app/shared/helpers/services/comunication-medical-agreement.service';
import { ModalService } from 'src/app/shared/helpers/services/modal.service';
import { AlertService } from 'src/app/shared/services/alert.service';
@Component({
    selector: 'app-medical-agreement',
    templateUrl: './medical-agreements.component.html',
    styleUrls: ['./medical-agreements.component.scss']
})

export class MedicalAgreementsComponent implements OnInit {



  constructor(

      private _modal: ModalService,
      private _communicationService: CommunicationMedicalAgreementService,
      private alertService: AlertService,
      private _PostMedicalAgreement : CreateAgreementRequestUsercase,
      public dialogService: DialogService,
  ) {
  }

  ngOnInit(
  ) { }

  ngOnDestroy() {
  }

  async save() {
      // Pedir a los componentes que manden el valor de sus formularios
    this._communicationService.sendNotifyForm();


    let request: medicalAgreementCreateModel | undefined = await this.getFormData();

    if(!request) return

    console.log('request',request)

    let response: ResponseData<MedicalAgreementResponse> | undefined = await this._PostMedicalAgreement.execute(request);


    console.log('response__PostMedicalAgreement',response)



    this._modal.open(response.message)


    //Registramos en la bd

   // await this._createCourierGuide.execute(request);



  }

  async getFormData() {
    const productsSelected = this._communicationService.getCurrentProductsSelectedDataFormData();
    const medicalAgreement = this._communicationService.getmedicalInformationDataFormCreate();
    const indicatorsCloseUp = this._communicationService.getIndicatorsCloseUpDataFormCreate();
    const indicatorsCloseUpTam = this._communicationService.getIndicatorsCloseUpTamDataFormCreate();
    const authorizationAgreement = this._communicationService.getAuthorizationAgreementDataFormDataFormCreate();

    if (medicalAgreement.invalid || indicatorsCloseUp.invalid || indicatorsCloseUpTam.invalid || authorizationAgreement.invalid) {
      this.alertService.warn(invalid);
      return ;
    }


    //console.log('save',productsSelected,medicalAgreement,indicatorsCloseUp,indicatorsCloseUpTam,authorizationAgreement)
    // console.log('save',productsSelected,medicalAgreement,indicatorsCloseUp,indicatorsCloseUpTam,authorizationAgreement)


    const productsSelectedValue = productsSelected.getRawValue()
    const medicalAgreementValue = medicalAgreement.getRawValue()
    const indicatorsCloseUpValue = indicatorsCloseUp.getRawValue()
    const indicatorsCloseUpTamValue = indicatorsCloseUpTam.getRawValue()
    const authorizationAgreementValue = authorizationAgreement.getRawValue()

    console.log('medicalAgreementValue',medicalAgreementValue )
    console.log('medicalAgreementValue',medicalAgreementValue.doctor_name.full_name_doctor )
    console.log('productsSelectedValue',productsSelectedValue )
    console.log('indicatorsCloseUpValue',indicatorsCloseUpValue )
    console.log('indicatorsCloseUpTamValue',indicatorsCloseUpTamValue )
    console.log('authorizationAgreementValue',authorizationAgreementValue )

    const objectlist = indicatorsCloseUpValue.paymentsDataList.map((item: any) => {
      return {
        target_number: item.payment_number,
        target_amount: item.payment
      }
    });

    console.log('objectlist',objectlist)

    const request: medicalAgreementCreateModel ={

      medical_agreement_application_date : medicalAgreementValue.aplication_date,
      year_medical_agreement : medicalAgreementValue.agreement_year,
      status : 1,
      branch_id : 1,
      cmp_medical : medicalAgreementValue.cmp,
      full_name_medical : medicalAgreementValue.doctor_name.full_name_doctor,
      medical_sap_code : medicalAgreementValue.code_sap,
      code_closeup_doctor : medicalAgreementValue.doctor_name.code_closeup,
      doctor_specialty : medicalAgreementValue.specialty,
      medical_category : medicalAgreementValue.category,
      medical_local : medicalAgreementValue.local_address,
      medical_district : medicalAgreementValue.local_district,
      term_agreement_start_date : medicalAgreementValue.start_date != null ? medicalAgreementValue.start_date : null,
      term_agreement_end_date : medicalAgreementValue.finish_date  != null ? medicalAgreementValue.finish_date : null,

      term_agreement_last_contract_end_date : medicalAgreementValue.previous_contract_end_date != '' ? medicalAgreementValue.previous_contract_end_date : null,
      term_agreement_id_payment_form : medicalAgreementValue.way_to_pay.id ,
      term_agreement_id_renewal : medicalAgreementValue.renovation,
      term_agreement_amount_agreement : medicalAgreementValue.previous_contract_count,

      ind_cup_assessment : indicatorsCloseUpValue.assessment,
      ind_cup_investment : indicatorsCloseUpValue.investment,
      ind_cup_currency_code : indicatorsCloseUpValue.type_currency.codigo,
      ind_cup_amount_payments : indicatorsCloseUpValue.payment_number.value,

      //desembolso inicial
      ind_cup_initial_disbursement : indicatorsCloseUpValue.initial_disbursement,
      ind_cup_total_goals : indicatorsCloseUpValue.total_objetives,
      ind_cup_total : indicatorsCloseUpValue.total,

      ind_cup_tam_total_compete : Number(indicatorsCloseUpTamValue.total_compete.toFixed(2)) ,
      ind_cup_tam_total_px : Number(indicatorsCloseUpTamValue.total_px.toFixed(2)),
      ind_cup_tam_own : Number(indicatorsCloseUpTamValue.own.toFixed(2)),
      ind_cup_tam_per_ms_negotiated : Number(indicatorsCloseUpTamValue.negotiated.toFixed(2)) ,
      ind_cup_tam_per_ms_current : Number(indicatorsCloseUpTamValue.current_duperu.toFixed(2)),
      ind_cup_tam_per_ms_reach : Number(indicatorsCloseUpTamValue.to_achieve.toFixed(2)),
      ind_cup_tam_per_ms_reach_monthly : Number(indicatorsCloseUpTamValue.to_reach_monthly.toFixed(2)),
      ind_cup_tam_per_previous_goal : Number(indicatorsCloseUpTamValue.previous_goal.toFixed(2)),
      ind_cup_tam_objective : Number(indicatorsCloseUpTamValue.objective_one.toFixed(2)),
      ind_cup_tam_objective_two : Number(indicatorsCloseUpTamValue.objective_two.toFixed(2)) ,
      ind_cup_tam_objective_three : Number(indicatorsCloseUpTamValue.objective_three.toFixed(2)) ,
      ind_cup_tam_objective_four : Number(indicatorsCloseUpTamValue.objective_four.toFixed(2)) ,

      ind_cup_objective_medical_list : objectlist,

      ind_cup_tam_total_value : Number(indicatorsCloseUpTamValue.total_value.toFixed(2)),
      ind_cup_tam_medical_prescription_value : Number(indicatorsCloseUpTamValue.medical_prescription_value.toFixed(2)),
      ind_cup_tam_own_recipe_value : Number(indicatorsCloseUpTamValue.own_recipe_value.toFixed(2)),
      ind_cup_tam_balance_payable : Number(indicatorsCloseUpTamValue.balance_payable.toFixed(2)),
      ind_cup_tam_to_value_reach : Number(indicatorsCloseUpTamValue.to_value_reach.toFixed(2)),
      ind_cup_tam_to_value_reach_monthly : Number(indicatorsCloseUpTamValue.to_value_reach_monthly.toFixed(2)),
      ind_cup_tam_previous_value_goal : Number(indicatorsCloseUpTamValue.previous_value_goal.toFixed(2)),
      ind_cup_tam_objective_value_one : Number(indicatorsCloseUpTamValue.objective_value_one.toFixed(2)),
      ind_cup_tam_objective_value_two : Number(indicatorsCloseUpTamValue.objective_value_two.toFixed(2)),
      ind_cup_tam_objective_value_three : Number(indicatorsCloseUpTamValue.objective_value_three.toFixed(2)),
      ind_cup_tam_objective_value_four : Number(indicatorsCloseUpTamValue.objective_value_four.toFixed(2)),

      observation : indicatorsCloseUpTamValue.comment != null ? indicatorsCloseUpTamValue.comment : '',

      //cod_responsible_visitor : authorizationAgreementValue.medical_visitor.user_code,
      cod_responsible_visitor : '75678578',
      cod_responsible_commercial_analyst : authorizationAgreementValue.commercial_analyst.user_code,
      cod_responsible_supervisor : authorizationAgreementValue.commercial_analyst.user_code,

      //cod_approval_analista_comercial,
      //cod_approval_supervisor  ,
      //cod_approval_Manager_comercial,
      //cod_approval_general_manager,

      //user_creation : authorizationAgreementValue.medical_visitor.user_code || null

    }


    return request;


  }



}
