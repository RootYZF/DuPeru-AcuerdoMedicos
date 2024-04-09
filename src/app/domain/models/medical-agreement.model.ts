export interface GetStatusFormInterface {
    isChanged: boolean;
    component: string
}

export interface medicalAgreementCreateModel {

  medical_agreement_application_date ?: Date,
  year_medical_agreement ?: number,
  medical_agreement_number ?: string  ,
  status ?: number,
  branch_id ?: number,
  cmp_medical ?: number,
  full_name_medical ?: string,
  medical_sap_code ?: string,
  code_closeup_doctor ?: string,
  doctor_specialty ?: string,
  medical_category ?: string,
  medical_local ?: string,
  medical_district ?: string,
  term_agreement_start_date ?: Date,
  term_agreement_end_date ?: Date,
  term_agreement_last_contract_end_date ?: Date,
  term_agreement_id_payment_form ?: number,
  term_agreement_id_renewal ?: number,
  term_agreement_amount_agreement ?: number,
  ind_cup_assessment ?: number,
  ind_cup_investment ?: number,
  ind_cup_currency_code ?: string,
  ind_cup_amount_payments ?: number,
  ind_cup_initial_disbursement ?: number,
  ind_cup_total_goals ?: number,
  ind_cup_total ?: number,
  ind_cup_tam_total_compete ?: number,
  ind_cup_tam_total_px ?: number,
  ind_cup_tam_own ?: number,
  ind_cup_tam_per_ms_negotiated ?: number,
  ind_cup_tam_per_ms_current ?: number,
  ind_cup_tam_per_ms_reach ?: number,
  ind_cup_tam_per_ms_reach_monthly ?: number,
  ind_cup_tam_per_previous_goal ?: number,
  ind_cup_tam_objective ?: number,
  ind_cup_tam_objective_two ?: number,
  ind_cup_tam_objective_three ?: number,
  ind_cup_tam_objective_four ?: number,

  ind_cup_tam_total_value ?: number,
  ind_cup_tam_medical_prescription_value ?: number,
  ind_cup_tam_own_recipe_value ?: number,
  ind_cup_tam_balance_payable ?: number,
  ind_cup_tam_to_value_reach ?: number,
  ind_cup_tam_to_value_reach_monthly ?: number,
  ind_cup_tam_previous_value_goal ?: number,
  ind_cup_tam_objective_value_one ?: number,
  ind_cup_tam_objective_value_two ?: number,
  ind_cup_tam_objective_value_three ?: number,
  ind_cup_tam_objective_value_four ?: number,

  observation ?: string,
  cod_responsible_visitor ?: string,
  cod_responsible_commercial_analyst ?: string,
  cod_responsible_supervisor ?: string,
  cod_approval_analista_comercial ?: string,
  cod_approval_supervisor ?: string,
  cod_approval_Manager_comercial ?: string,
  cod_approval_general_manager ?: string,
  user_creation ?: string,
  creation_date ?: Date,
  modification_user ?: string,
  modification_date ?: Date,

  // indCupObjectiveMedicalModel es una lista de objetos
  ind_cup_objective_medical_list ?: indCupObjectiveMedicalModel[],

}


export interface indCupObjectiveMedicalModel
  {
    target_number: number,
    target_amount: number,
  }

