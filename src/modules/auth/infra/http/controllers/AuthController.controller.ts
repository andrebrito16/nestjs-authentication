import JwtAuthGuard from '@modules/auth/guards/JwtAuth.guard';
import LoginService from '@modules/auth/services/LoginService.service';
import {
  Controller,
  Get,
  HttpCode,
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

  // @UseGuards(LocalAuthGuard)
  @HttpCode(200)
  @Post('/login')
  async login(@Request() req): Promise<any> {
    return this.loginService.execute(req.body.email, req.body.password);
  }

  @UseGuards(JwtAuthGuard)
  @Get('/login')
  async getLogin(@Request() req): Promise<any> {
    return req.user;
  }
}

export default AuthController;
