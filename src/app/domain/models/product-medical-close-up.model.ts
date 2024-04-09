export interface ProductMedicalCloseUpModel {
  id: number;
  load_period: string;
  product_type: string;
  formula_brand: string;
  compete: number;
  own: number;
  px_total: number;
  doctor_prescription_value: number;
  own_medical_prescription_value: number;
  visitor_recipe_value: number;
  own_visitor_recipe_value: number;
  total_value: number;
  own_value: number;
  code_closeup_doctor: string;
  isChecked?: boolean;

}
