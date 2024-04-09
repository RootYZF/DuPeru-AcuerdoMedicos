import { ResponseData } from "../response/global-response";

export interface UseCasePromise<S, T> {

  execute(params: S): Promise<ResponseData<T>>;

}
