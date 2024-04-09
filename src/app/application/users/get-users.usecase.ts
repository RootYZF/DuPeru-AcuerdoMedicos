import { Injectable } from "@angular/core";
import { UseCasePromise } from "src/app/domain/base/use-case-promise";
import { UsersModel } from "src/app/domain/models/users.model";
import { UsersRepository } from "src/app/domain/repository/users/users.repository";
import { ResponseData } from "src/app/domain/response/global-response";
@Injectable({
  providedIn: 'root'
})
export class GetUsersUseCase implements UseCasePromise<number , UsersModel[]> {

  constructor(private repository: UsersRepository) { }

  execute(idrol: number): Promise<ResponseData<UsersModel[]>> {

    return this.repository.getUsersByIdRol(idrol);
  }

}




