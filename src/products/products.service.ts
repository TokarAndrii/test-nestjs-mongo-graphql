import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Product, ProductDocument } from './models/product.model';
import { NewProductInput } from './dto/new-product.input';

@Injectable()
export class ProductsService {
  constructor(
    @InjectModel(Product.name)
    private readonly productsModel: Model<ProductDocument>,
  ) {}

  productsList() {
    return this.productsModel.find().exec();
  }

  create(payload: NewProductInput) {
    const createdProduct = new this.productsModel(payload);
    return createdProduct.save();
  }
}
