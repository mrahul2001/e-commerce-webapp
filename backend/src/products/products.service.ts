import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

import { Product } from './entities/product.entity';
import { CreateProductDto } from './dto/create-product.dto';
import { GetProductDto } from './dto/get-products.dto';

@Injectable()
export class ProductsService {

  constructor(
    @InjectRepository(Product) private productRepository: Repository<Product>
  ) { }

  async insert(createProductDto: CreateProductDto) {
    const newProduct = await this.productRepository.save(createProductDto);
    await this.productRepository.save(newProduct);

    return newProduct;
  }

  async getProducts(getProductDto: GetProductDto) {
    const queryBuilder = this.productRepository
      .createQueryBuilder('products')
      .select([
        'productName',
        'productImage',
        'productDescription',
        'productAvailability',
        'productPrice',
        'productRating',
        'id',
      ])
      .orderBy('productPrice');

    Object.entries(getProductDto).forEach(([key, value]) => {
      if (value !== undefined) {
        switch (key) {
          case 'productName':
            queryBuilder.andWhere('productName like :productName', { productName: `%${value}%` });
            break;
          case 'productPrice':
            queryBuilder.andWhere('productPrice <= :productPrice', { productPrice: value });
            break;
          case 'productRating':
            queryBuilder.andWhere('productRating = :productRating', { productRating: value });
            break;
          case 'productAvailability':
            queryBuilder.andWhere('productAvailability = :productAvailability', { productAvailability: value });
        }
      }
    });
    return await queryBuilder.execute();
  }

  async getProductById(productId: string) {
    const fetchedProduct = await this.productRepository
      .createQueryBuilder('products')
      .where('id = :productId', {productId})
      .execute();

      return fetchedProduct;
  }
}
