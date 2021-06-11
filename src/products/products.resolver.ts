import { Args, Resolver, Query, Mutation } from '@nestjs/graphql';
import { Product } from './models/product.model';
import { ProductsService } from './products.service';
import { NewProductInput } from './dto/new-product.input';

@Resolver(() => Product)
export class ProductsResolver {
  constructor(private productsService: ProductsService) {}

  @Query(() => [Product])
  allProducts() {
    return this.productsService.productsList();
  }

  @Mutation(() => Product)
  async createProduct(@Args('payload') payload: NewProductInput) {
    return this.productsService.create(payload);
  }
}
