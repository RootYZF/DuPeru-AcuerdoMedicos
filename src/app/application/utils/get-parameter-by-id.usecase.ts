import { Injectable } from '@angular/core';
import { UseCasePromise } from 'src/app/domain/base/use-case-promise';
import { UtilsRepository } from 'src/app/domain/repository/utils/utils.repository';
import { ResponseData } from 'src/app/domain/response/global-response';
import { ParameterResponse } from 'src/app/domain/response/parameter.response';

@Injectable({
  providedIn: 'root'
})

export class GetParameterByIdUseCase implements UseCasePromise<number, ParameterResponse[]> {

  constructor(
    private _utilsRepository: UtilsRepository
  ) { }

  execute(id: number): Promise<ResponseData<ParameterResponse[]>> {
    return this._utilsRepository.getParameterById(id);
  }

}
