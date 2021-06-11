import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ProductsResolver } from './products.resolver';
import { ProductsService } from './products.service';
import { Product, ProductSchema } from './models/product.model';

@Module({
  providers: [ProductsResolver, ProductsService],
  imports: [
    MongooseModule.forFeature([{ name: Product.name, schema: ProductSchema }]),
  ],
})
export class ProductsModule {}
