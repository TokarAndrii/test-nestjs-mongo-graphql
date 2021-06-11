import { Field, InputType } from '@nestjs/graphql';
import { IsOptional } from 'class-validator';

@InputType()
export class NewProductInput {
  @Field()
  name: string;

  @Field({ nullable: true })
  @IsOptional()
  description?: string;

  @Field()
  price: number;

  @Field()
  @IsOptional()
  countryProduced?: string;
}
