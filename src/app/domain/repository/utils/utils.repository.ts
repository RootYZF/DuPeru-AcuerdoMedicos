
import { ResponseData } from "../../response/global-response";
import { ParameterResponse } from "../../response/parameter.response";

export abstract class UtilsRepository {
    abstract getParameterById(id: number): Promise<ResponseData<ParameterResponse[]>>
}