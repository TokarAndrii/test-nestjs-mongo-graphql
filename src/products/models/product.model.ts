import { Field, ID, ObjectType } from '@nestjs/graphql';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';

export type ProductDocument = Product & Document;

@Schema()
@ObjectType()
export class Product {
  @Field((type) => ID)
  _id: MongooseSchema.Types.ObjectId;

  @Prop()
  @Field()
  name: string;

  @Prop()
  @Field({ nullable: true })
  description?: string;

  @Prop()
  @Field()
  price: number;

  @Prop()
  @Field({ nullable: true })
  countryProduced?: string;
}

export const ProductSchema = SchemaFactory.createForClass(Product);
