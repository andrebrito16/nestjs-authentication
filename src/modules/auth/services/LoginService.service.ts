import BCryptHashProvider from '@modules/users/providers/HashProvider/implementations/BCryptHashProvider';
import { HttpException, Inject, Injectable } from '@nestjs/common';
import { PrismaService } from '../../../shared/prisma/prisma.service';

@Injectable()
export class AuthService {
  constructor(
    @Inject('Prisma')
    private readonly prisma: PrismaService,

    @Inject('HashProvider')
    private readonly hashProvider: BCryptHashProvider,
  ) {}

  public async execute(email: string, password: string): Promise<any> {
    const user = await this.prisma.user.findUnique({
      where: {
        email,
      },
    });

    if (await this.hashProvider.compareHash(password, user.password)) {
      return user;
    }

    throw new HttpException(
      {
        message: 'Invalid Credentials',
      },
      401,
    );
  }
}

export default AuthService;
