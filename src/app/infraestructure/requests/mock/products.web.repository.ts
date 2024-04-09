import { Injectable } from '@angular/core';
import { ProductModel } from 'src/app/domain/models/product.model';
import { ProductRespository } from 'src/app/domain/repository/products/products.repository';
import { ResponseData } from 'src/app/domain/response/global-response';

@Injectable({
    providedIn: 'root'
})
export class ProductWebRepository implements ProductRespository {

    currentProductList: ProductModel[] = [
        {
            id: 1,
            code: 'AAA0003',
            description: 'BANES 100MG/5ML SUSPENSIÓN ORAL'
        },
        {
            id: 2,
            code: 'AAA0005',
            description: 'APIRON 500MG/ML SOLUCIÓN ORAL-GOTAS'
        },
        {
            id: 3,
            code: 'AAA0007',
            description: 'ARDILAN 10MG COMPRIMIDOS'
        },
        {
            id: 4,
            code: 'AAA0004',
            description: 'AZIMUT 500MG COMPRIMIDOS RECUBIERTOS'
        },
        {
            id: 5,
            code: 'AAA0012',
            description: 'ACTERIL 5MG/ML SOLUCIÓN PARA NEBULIZACIÓN Y TRATAMIENTO'
        }
    ];

    currentUnregisteredProductList: ProductModel[] = [
        {
            id: 1,
            code: 'AAA0003',
            description: 'BANES 100MG/5ML SUSPENSIÓN ORAL'
        },
        {
            id: 2,
            code: 'AAA0005',
            description: 'APIRON 500MG/ML SOLUCIÓN ORAL-GOTAS'
        },
        {
            id: 3,
            code: 'AAA0007',
            description: 'ARDILAN 10MG COMPRIMIDOS'
        },
        {
            id: 4,
            code: 'AAA0004',
            description: 'AZIMUT 500MG COMPRIMIDOS RECUBIERTOS'
        },
        {
            id: 5,
            code: 'AAA0012',
            description: 'ACTERIL 5MG/ML SOLUCIÓN PARA NEBULIZACIÓN Y TRATAMIENTO'
        }
    ];

    oldProductList: ProductModel[] = [/*
        {
            id: 1,
            code: 'AAA0003',
            description: 'BANES 100MG/5ML SUSPENSIÓN ORAL'
        },
        {
            id: 2,
            code: 'AAA0005',
            description: 'APIRON 500MG/ML SOLUCIÓN ORAL-GOTAS'
        },
        {
            id: 3,
            code: 'AAA0007',
            description: 'ARDILAN 10MG COMPRIMIDOS'
        },
        {
            id: 4,
            code: 'AAA0004',
            description: 'AZIMUT 500MG COMPRIMIDOS RECUBIERTOS'
        },
        {
            id: 5,
            code: 'AAA0012',
            description: 'ACTERIL 5MG/ML SOLUCIÓN PARA NEBULIZACIÓN'
        },
        {
            id: 1,
            code: 'AAA0003',
            description: 'BANES 100MG/5ML SUSPENSIÓN ORAL'
        },
        {
            id: 2,
            code: 'AAA0005',
            description: 'APIRON 500MG/ML SOLUCIÓN ORAL-GOTAS'
        },
        {
            id: 3,
            code: 'AAA0007',
            description: 'ARDILAN 10MG COMPRIMIDOS'
        },
        {
            id: 4,
            code: 'AAA0004',
            description: 'AZIMUT 500MG COMPRIMIDOS RECUBIERTOS'
        },
        {
            id: 5,
            code: 'AAA0012',
            description: 'ACTERIL 5MG/ML SOLUCIÓN PARA NEBULIZACIÓN'
        },
        {
            id: 3,
            code: 'AAA0007',
            description: 'ARDILAN 10MG COMPRIMIDOS'
        },
        {
            id: 4,
            code: 'AAA0004',
            description: 'AZIMUT 500MG COMPRIMIDOS RECUBIERTOS'
        },
        {
            id: 5,
            code: 'AAA0012',
            description: 'ACTERIL 5MG/ML SOLUCIÓN PARA NEBULIZACIÓN'
        },
        {
            id: 4,
            code: 'AAA0004',
            description: 'AZIMUT 500MG COMPRIMIDOS RECUBIERTOS'
        },
        {
            id: 5,
            code: 'AAA0012',
            description: 'ACTERIL 5MG/ML SOLUCIÓN PARA NEBULIZACIÓN'
        }*/
    ];

    oldUnregisteredProductList: ProductModel[] = [/*
        {
            id: 1,
            code: 'AAA0003',
            description: 'BANES 150MG/5ML SUSPENSIÓN ORAL'
        },
        {
            id: 2,
            code: 'AAA0005',
            description: 'APIRON 250MG/ML SOLUCIÓN ORAL-GOTAS'
        },
        {
            id: 3,
            code: 'AAA0007',
            description: 'ARDILAN 15MG COMPRIMIDOS'
        },
        {
            id: 4,
            code: 'AAA0004',
            description: 'AZIMUT 300MG COMPRIMIDOS RECUBIERTOS'
        },
        {
            id: 5,
            code: 'AAA0012',
            description: 'ACTERIL 10MG/ML SOLUCIÓN PARA NEBULIZACIÓN'
        },
        {
            id: 1,
            code: 'AAA0003',
            description: 'BANES 120MG/5ML SUSPENSIÓN ORAL'
        },
        {
            id: 2,
            code: 'AAA0005',
            description: 'APIRON 350MG/ML SOLUCIÓN ORAL-GOTAS'
        },
        {
            id: 3,
            code: 'AAA0007',
            description: 'ARDILAN 8MG COMPRIMIDOS'
        },
        {
            id: 4,
            code: 'AAA0004',
            description: 'AZIMUT 500MG COMPRIMIDOS RECUBIERTOS'
        },
        {
            id: 5,
            code: 'AAA0012',
            description: 'ACTERIL 5MG/ML SOLUCIÓN PARA NEBULIZACIÓN'
        },*/
    ]

    getCurrentProducts(): Promise<ResponseData<ProductModel[]>> {
        return new Promise((resolve, reject) => {
            resolve({
                message: 'Productos encontrados',
                error: [],
                data: this.currentProductList
            })
        });
    }

    getCurrentUnregisteredProducts(): Promise<ResponseData<ProductModel[]>> {
        return new Promise((resolve, reject) => {
            resolve({
                message: 'Productos encontrados',
                error: [],
                data: this.currentUnregisteredProductList
            })
        });
    }

    getOldProducts(): Promise<ResponseData<ProductModel[]>> {
        return new Promise((resolve, reject) => {
            resolve({
                message: 'Productos encontrados',
                error: [],
                data: this.oldProductList
            })
        });
    }

    getOldUnregisteredProducts(): Promise<ResponseData<ProductModel[]>> {
        return new Promise((resolve, reject) => {
            resolve({
                message: 'Productos encontrados',
                error: [],
                data: this.oldUnregisteredProductList
            })
        });
    }

}
