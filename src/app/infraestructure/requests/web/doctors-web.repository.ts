import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { lastValueFrom } from 'rxjs';
import { ResponseData } from 'src/app/domain/response/global-response';
import { DU_PERU_URL } from 'src/app/shared/helpers/constants/url.constants';
import { DoctorsModel } from 'src/app/domain/models/doctors.model';
import { DoctorsRespository } from 'src/app/domain/repository/doctors/doctors.repository';

@Injectable({ 
    providedIn: 'root' 
})
export class DoctorsWebRepository implements DoctorsRespository {
    
    constructor(
        private http: HttpClient
    ) {}

    getDoctorsByUser(user: string): Promise<ResponseData<DoctorsModel[]>> {
        const url = `${DU_PERU_URL}/listdoctorbyuser`;
        return lastValueFrom(this.http.get<ResponseData<DoctorsModel[]>>(url));
    }
}