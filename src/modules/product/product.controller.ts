import { Controller, Get, HttpStatus, Param, Query, Res } from '@nestjs/common';
import { isNotEmptyObject } from 'class-validator';
import { Response } from 'express';
import { IServerResponse } from '../../app.interface';
import { IProduct } from './product.interface';
import { ProductService } from './product.service';

@Controller('product')
export class ProductController {
    constructor(
        private readonly productService: ProductService,
    ) { }

    @Get()
    public findAll(@Query('page') page: number): IServerResponse<IProduct> {
        return this.productService.findAll(page);
    }

    @Get(':id')
    public findOne(@Param('id') id: number, @Res() response: Response) {
        const product = this.productService.findOne(id);

        if (isNotEmptyObject(product) === false) {
            response.status(HttpStatus.NOT_FOUND).send({});
            return ;
        }

        response.send(product);
    }
}
