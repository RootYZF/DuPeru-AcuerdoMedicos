import { Injectable } from '@angular/core';
import { DoctorsModel } from 'src/app/domain/models/doctors.model';
import { ProductModel } from 'src/app/domain/models/product.model';
import { DoctorsRespository } from 'src/app/domain/repository/doctors/doctors.repository';
import { ResponseData } from 'src/app/domain/response/global-response';

@Injectable({
    providedIn: 'root'
})
export class DoctorsMockWebRepository implements DoctorsRespository {

    doctorstList: DoctorsModel[] = [
        
    ];

    getDoctors(): Promise<ResponseData<DoctorsModel[]>> {
        return new Promise((resolve, reject) => {
            resolve({
                message: 'Medicos encontrados',
                error: [],
                data: this.doctorstList
            })
        });
    }

    
}