
import { TableModule } from "primeng/table";
import { ManageMedicalVisitorProgramingComponent } from "./manage-medical-visitor-programing/manage-medical-visitor-programing.component";
import { CommonModule } from "@angular/common";
import { PrimeNGModule } from "src/app/shared/primeng/primeng.module";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { SharedModule } from "primeng/api";
import { NgModule } from "@angular/core";


const components = [
  ManageMedicalVisitorProgramingComponent

]


@NgModule({
  imports: [

    CommonModule,
    MedicalVisitorProgramingModule,
    TableModule,
    PrimeNGModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule
  ],
  declarations: [components]
})


export class MedicalVisitorProgramingModule { }
