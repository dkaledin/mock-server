import { Injectable } from '@nestjs/common';
import { readFileSync } from 'fs';
import { resolve } from 'path';
import { IServerResponse } from '../../app.interface';
import { IProduct } from './product.interface';

@Injectable()
export class ProductService {
    private productOnPage = 8;
    private products: IProduct[];

    constructor() {
        const json = readFileSync(resolve('db', 'products.json'), { encoding: 'utf8' }).toString();
        this.products = JSON.parse(json);
    }

    public findAll(page = 1): IServerResponse<IProduct> {
        const data = this.products.slice((page - 1) * this.productOnPage, page * this.productOnPage);

        return {
            data,
            count: this.productOnPage,
            total: this.products.length,
            pageCount: Math.ceil(this.products.length / this.productOnPage),
            page: Number(page),
        };
    }

    public findOne(id: number): IProduct {
        return this.products
            .filter(product => product.id === Number(id))
            .reduce((_, product) => {
                return product;
            }, {} as IProduct);
    }
}
