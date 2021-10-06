import { AuthenticatedGuard } from '@modules/auth/guards/Authenticated.guard';
import LocalAuthGuard from '@modules/auth/guards/LocalAuth.guard';
import LoginService from '@modules/auth/services/LoginService.service';
import {
  Controller,
  Get,
  Inject,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';

@Controller('auth')
class AuthController {
  constructor(
    @Inject('LoginService')
    private readonly loginService: LoginService,
  ) {}

  @UseGuards(LocalAuthGuard)
  @Post('/login')
  async login() {
    return {
      message: 'Logged in',
    };
  }

  @UseGuards(AuthenticatedGuard)
  @Get('/login')
  async getLogin(@Request() req): Promise<any> {
    return req.user;
  }
}

export default AuthController;
