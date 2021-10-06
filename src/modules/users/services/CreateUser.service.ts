import { User, Prisma } from '.prisma/client';
import { Inject, Injectable } from '@nestjs/common';
import { PrismaService } from '../../../shared/prisma/prisma.service';
import BCryptHashProvider from '../providers/HashProvider/implementations/BCryptHashProvider';

@Injectable()
class CreateUserService {
  constructor(
    @Inject('Prisma')
    private readonly prisma: PrismaService,

    @Inject('HashProvider')
    private readonly hashProvider: BCryptHashProvider,
  ) {}

  async createUser(payload: Prisma.UserCreateInput): Promise<User> {
    const { email, password: plainTextPassword } = payload;

    const password = await this.hashProvider.generateHash(plainTextPassword);

    return this.prisma.user.create({
      data: {
        email,
        password,
      },
    });
  }
}

export default CreateUserService;
