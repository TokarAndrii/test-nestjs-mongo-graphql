import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { MongooseModule } from '@nestjs/mongoose';
import { JwtModule } from '@nestjs/jwt';
import { AuthService } from './auth.service';
import { UsersService } from './users.service';
import { LocalStrategy } from './auth.local.strategy';
import { JwtStrategy } from './auth.jwt.strategy';
import { AuthResolver } from './auth.resolver';
import { User, UserSchema } from './model/user.model';

//TODO: move to env
export const jwtConstants = {
  secret: 'secretKey',
};

@Module({
  imports: [
    PassportModule,
    JwtModule.register({
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '6000s' },
    }),
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
  ],
  providers: [
    AuthService,
    LocalStrategy,
    JwtStrategy,
    AuthResolver,
    UsersService,
  ],
})
export class AuthModule {}
