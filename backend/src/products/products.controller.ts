import { Controller, Post, Body, UseGuards, Get, Param } from '@nestjs/common';

import { ProductsService } from './products.service';
import { CreateProductDto } from './dto/create-product.dto';
import { CustomApiResponse } from 'src/utils/send-response';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { GetProductDto } from './dto/get-products.dto';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) { }

  @Post()
  async insert(@Body() createProductDto: CreateProductDto) {
    const insertedProduct = await this.productsService.insert(createProductDto);

    return new CustomApiResponse(201, 'Product Inserted', insertedProduct)
  }

  // @UseGuards(JwtAuthGuard)
  @Post('find')
  async getProducts(
    @Body() getProductDto: GetProductDto
  ) {
    const getProductDetails = await this.productsService.getProducts(getProductDto);

    return new CustomApiResponse(200, 'Products Fetched', getProductDetails);
  }


  @Get(':productId')
  async getProductById(@Param('productId') productId: string) {
    const fetchedProduct = await this.productsService.getProductById(productId);

    return new CustomApiResponse(200, 'Product Fetched', fetchedProduct);
  }


}
