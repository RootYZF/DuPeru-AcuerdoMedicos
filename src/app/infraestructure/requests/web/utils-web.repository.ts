import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { lastValueFrom } from 'rxjs';
import { ResponseData } from 'src/app/domain/response/global-response';
import { UtilsRepository } from 'src/app/domain/repository/utils/utils.repository';
import { ParameterResponse } from 'src/app/domain/response/parameter.response';
import { DU_PERU_URL } from 'src/app/shared/helpers/constants/url.constants';
import { DoctorsModel } from 'src/app/domain/models/doctors.model';

@Injectable({ 
    providedIn: 'root' 
})
export class UtilstWebRepository implements UtilsRepository {
    
    constructor(
        private http: HttpClient
    ) {}

    getParameterById(id: number): Promise<ResponseData<ParameterResponse[]>> {
        const url = `${DU_PERU_URL}/businessentityid/${id}`;
        return lastValueFrom(this.http.get<ResponseData<ParameterResponse[]>>(url));
    }
}