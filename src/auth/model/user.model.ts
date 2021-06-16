import { Field, ID, ObjectType } from '@nestjs/graphql';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';
import { Entity, Column, ObjectIdColumn } from 'typeorm';

@Entity({ name: 'users' })
@Schema()
@ObjectType()
export class User {
  @ObjectIdColumn()
  @Field((type) => ID)
  _id: MongooseSchema.Types.ObjectId;

  @Column({ type: 'text' })
  @Prop()
  @Field()
  username: string;

  @Column({ type: 'text' })
  @Prop()
  @Field()
  password: string;

  @Column({ type: 'text' })
  @Prop()
  @Field()
  email: string;

  //@Column({ type: 'text' })
  // @Prop()
  // @Field()
  // name: string;
}

export type UserDocument = User & Document;

export const UserSchema = SchemaFactory.createForClass(User);
