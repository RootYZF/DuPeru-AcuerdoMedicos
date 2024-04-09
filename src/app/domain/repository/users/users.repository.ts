import { UsersModel } from "../../models/users.model";
import { ResponseData } from "../../response/global-response";


export abstract class  UsersRepository
{
  abstract getUsersByIdRol(idrol?: number): Promise<ResponseData<UsersModel[]>>;
}


