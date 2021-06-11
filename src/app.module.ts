import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';
import { ProductsModule } from './products/products.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { dbUriCreator } from './helpers/dbUriCreator';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: ['.env.development.local'],
      isGlobal: true,
      cache: true,
    }),
    GraphQLModule.forRoot({
      playground: true,
      autoSchemaFile: 'schema.gql',
    }),
    ProductsModule,
    MongooseModule.forRoot(dbUriCreator()),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
