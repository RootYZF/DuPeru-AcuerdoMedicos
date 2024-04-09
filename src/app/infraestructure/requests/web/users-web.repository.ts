import { HttpClient } from "@angular/common/http";
import { Injectable } from '@angular/core';
import { lastValueFrom } from "rxjs";
import { UsersModel } from "src/app/domain/models/users.model";
import { UsersRepository } from "src/app/domain/repository/users/users.repository";
import { ResponseData } from "src/app/domain/response/global-response";
import { DU_PERU_URL } from 'src/app/shared/helpers/constants/url.constants';


@Injectable({
  providedIn: 'root'
})
export class UsersWebRepository implements  UsersRepository {

    constructor(
      private http: HttpClient
    ) {}


    getUsersByIdRol(idrol?: number | undefined): Promise<ResponseData<UsersModel[]>> {

      const url = `${DU_PERU_URL}/listuser?idrol=${idrol}`;
      return lastValueFrom(this.http.get<ResponseData<UsersModel[]>>(url));

    }

}






