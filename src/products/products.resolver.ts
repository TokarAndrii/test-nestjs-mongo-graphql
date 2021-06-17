import { Args, Resolver, Query, Mutation } from '@nestjs/graphql';
import { UseGuards } from '@nestjs/common';
import { Schema as MongooseSchema } from 'mongoose';
import { Product } from './models/product.model';
import { ProductsService } from './products.service';
import { NewProductInput } from './dto/new-product.input';
import { UpdateProductInput } from './dto/update-product.input';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@Resolver(() => Product)
export class ProductsResolver {
  constructor(private productsService: ProductsService) {}

  @Query(() => [Product])
  @UseGuards(JwtAuthGuard)
  allProducts() {
    return this.productsService.productsList();
  }

  @Query(() => Product)
  @UseGuards(JwtAuthGuard)
  product(
    @Args('_id', { type: () => String }) _id: MongooseSchema.Types.ObjectId,
  ) {
    return this.productsService.getById(_id);
  }

  @Mutation(() => Product)
  @UseGuards(JwtAuthGuard)
  async createProduct(@Args('payload') payload: NewProductInput) {
    return this.productsService.create(payload);
  }

  @Mutation(() => Product)
  @UseGuards(JwtAuthGuard)
  async deleteProduct(
    @Args('_id', { type: () => String }) _id: MongooseSchema.Types.ObjectId,
  ) {
    return this.productsService.deleteProduct(_id);
  }

  @Mutation(() => Product)
  @UseGuards(JwtAuthGuard)
  async updateProduct(
    @Args('payload', { type: () => UpdateProductInput })
    payload: UpdateProductInput,
  ) {
    return this.productsService.updateProduct(payload);
  }
}
