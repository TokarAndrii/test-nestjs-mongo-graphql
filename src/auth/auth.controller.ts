import { Controller, Post, Req, UseGuards } from '@nestjs/common';
import { AuthPayload } from './model/auth-payload.model';
import { Request } from 'express';

import { User } from './model/user.model';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from './guards/local-auth.guard';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @Post('login')
  login(@Req() req: Request): Promise<AuthPayload> {
    return this.authService.login(req.user as User);
  }
}
