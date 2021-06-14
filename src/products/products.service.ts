import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Schema as MongooseSchema } from 'mongoose';
import { Product, ProductDocument } from './models/product.model';
import { NewProductInput } from './dto/new-product.input';
import { UpdateProductInput } from './dto/update-product.input';

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

  getById(_id: MongooseSchema.Types.ObjectId) {
    return this.productsModel.findById(_id).exec();
  }

  deleteProduct(_id: MongooseSchema.Types.ObjectId) {
    return this.productsModel.findByIdAndDelete(_id).exec();
  }

  updateProduct(payload: UpdateProductInput) {
    const { _id, ...restPayload } = payload;
    return this.productsModel
      .findByIdAndUpdate(_id, restPayload, { new: true })
      .exec();
  }
}
