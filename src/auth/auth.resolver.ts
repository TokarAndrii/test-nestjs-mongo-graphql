import { Args, Resolver, Mutation } from '@nestjs/graphql';
import { UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { User } from './model/user.model';
import { LoginInput } from './dto/login.input';
import { AuthPayload } from './model/auth-payload.model';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { GqlAuthGuard } from './guards/gql-auth.guard';

@Resolver(() => User)
export class AuthResolver {
  constructor(private authService: AuthService) {}

  //TODO fix for enable working Local strategy
  //now login only works through rest api
  @UseGuards(GqlAuthGuard, LocalAuthGuard)
  @Mutation(() => AuthPayload)
  async login(@Args('loginInput') loginInput: LoginInput) {
    return this.authService.login(loginInput);
  }
}
