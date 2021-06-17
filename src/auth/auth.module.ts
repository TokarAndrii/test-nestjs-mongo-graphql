import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { MongooseModule } from '@nestjs/mongoose';
import { JwtModule } from '@nestjs/jwt';
import { AuthService } from './auth.service';
import { UsersService } from './users.service';
import { LocalStrategy } from './strategies/auth.local.strategy';
import { JwtStrategy } from './strategies/auth.jwt.strategy';
import { AuthResolver } from './auth.resolver';
import { User, UserSchema } from './model/user.model';
import { AuthController } from './auth.controller';

//TODO: move to env
export const jwtConstants = {
  secret: 'secretKey',
};

@Module({
  imports: [
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.register({
      secret: jwtConstants.secret,
      //TODO: move to env
      signOptions: { expiresIn: '6000s' },
    }),
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
  ],
  controllers: [AuthController],
  providers: [
    AuthService,
    LocalStrategy,
    JwtStrategy,
    AuthResolver,
    UsersService,
  ],
})
export class AuthModule {}
