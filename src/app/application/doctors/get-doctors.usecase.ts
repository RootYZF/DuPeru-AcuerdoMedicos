import { Injectable } from '@angular/core';
import { UseCasePromise } from 'src/app/domain/base/use-case-promise';
import { DoctorsModel } from 'src/app/domain/models/doctors.model';
import { DoctorsRespository } from 'src/app/domain/repository/doctors/doctors.repository';
import { ResponseData } from 'src/app/domain/response/global-response';
@Injectable({
    providedIn: 'root'
})
export class GetDoctorstUsecase implements UseCasePromise<string, DoctorsModel[]>{

    constructor(private repository: DoctorsRespository) { }

    execute(user: string): Promise<ResponseData<DoctorsModel[]>> {
        return this.repository.getDoctorsByUser(user);
    }
}
