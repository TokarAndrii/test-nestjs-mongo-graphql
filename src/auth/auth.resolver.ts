import { Args, Resolver, Mutation } from '@nestjs/graphql';
import { UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UsersService } from './users.service';
import { User } from './model/user.model';
import { LoginInput } from './dto/login.input';
import { AuthPayload } from './model/auth-payload.model';
import { LocalAuthGuard } from '../auth/local-auth.guard';

@Resolver(() => User)
export class AuthResolver {
  constructor(
    private authService: AuthService,
    private usersService: UsersService,
  ) {}

  @UseGuards(LocalAuthGuard)
  @Mutation(() => AuthPayload)
  async login(@Args('loginInput') loginInput: LoginInput) {
    const dbUserData = await this.usersService.findOneByEmail(loginInput.email);

    if (loginInput.password === dbUserData.password) {
      return this.authService.login(loginInput);
    } else {
      return null;
    }
  }
}
