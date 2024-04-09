
import { Injectable } from '@angular/core';
import { UseCasePromise } from 'src/app/domain/base/use-case-promise';
import { AgreementRequestRespository } from 'src/app/domain/repository/requests/agreement-requests.repository';
import { ResponseData } from 'src/app/domain/response/global-response';
import { PokemonInterface } from 'src/app/domain/response/poke-dummy.response';

@Injectable({
    providedIn: 'root'
})
export class AgreementRequestUsercase implements UseCasePromise<null, void>{

    constructor(private repository: AgreementRequestRespository) { }

    execute(): Promise<ResponseData<void>> {
        return this.repository.getAgreementRequest();
    }

}
