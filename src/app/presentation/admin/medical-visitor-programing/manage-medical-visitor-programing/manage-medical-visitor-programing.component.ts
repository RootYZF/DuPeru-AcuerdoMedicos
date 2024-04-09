import { Component, OnInit } from "@angular/core"
import { DoctorsModel } from "src/app/domain/models/doctors.model"
@Component({
  selector: 'app-manage-medical-visitor-programing',
  templateUrl: './manage-medical-visitor-programing.component.html',
  styleUrls: ['./manage-medical-visitor-programing.component.scss']
})

export class ManageMedicalVisitorProgramingComponent implements OnInit {


  selectedAgreement: any
  doctorsList: DoctorsModel[] = []
  agreementsList: any[] = []




  constructor() { }

  ngOnInit(): void {
      throw new Error("Method not implemented.")
    }

}

























