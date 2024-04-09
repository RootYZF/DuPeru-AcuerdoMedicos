import { ProductModel } from "../../models/product.model";
import { ResponseData } from "../../response/global-response";

export abstract class ProductRespository {
    
    abstract getCurrentProducts(): Promise<ResponseData<ProductModel[]>>;
    abstract getCurrentUnregisteredProducts(): Promise<ResponseData<ProductModel[]>>;
    abstract getOldProducts(): Promise<ResponseData<ProductModel[]>>;
    abstract getOldUnregisteredProducts(): Promise<ResponseData<ProductModel[]>>;
    
}