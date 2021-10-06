import CreateUserService from '@modules/users/services/CreateUser.service';
import { Body, Controller, HttpCode, Inject, Post } from '@nestjs/common';
import { User as UserModel } from '@prisma/client';

@Controller('users')
class UsersController {
  constructor(
    @Inject('CreateUserService')
    private readonly createUserService: CreateUserService,
  ) {}

  @Post('/create')
  @HttpCode(201)
  public async create(
    @Body() postData: { email: string; password: string },
  ): Promise<UserModel> {
    return this.createUserService.createUser({
      email: postData.email,
      password: postData.password,
    });
  }
}

export default UsersController;
