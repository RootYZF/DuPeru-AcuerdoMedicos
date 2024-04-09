import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { ManageMedicalVisitorProgramingComponent } from "./manage-medical-visitor-programing/manage-medical-visitor-programing.component";





const routeDefault = '';


const routes: Routes = [
    {
        path: routeDefault,
        component: ManageMedicalVisitorProgramingComponent,
        title: 'Programacion de visitantes medicos'
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})

export class MedicalVisitorProgramingRoutingModule { }


