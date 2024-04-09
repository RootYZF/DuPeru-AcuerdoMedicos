import { Injectable } from '@angular/core'
import { UseCasePromise } from 'src/app/domain/base/use-case-promise';
import { AuthRespository } from 'src/app/domain/repository/auth/auth.repository';


@Injectable({
    providedIn: 'root'
})
export class loginUsecase implements UseCasePromise<null, any>{

    constructor(
        private readonly repository: AuthRespository
    ){}

    execute(): Promise<any> {
        return this.repository.logIn();
    }
}