import { PrismaService } from './../../../shared/prisma/prisma.service';
import { Inject, Injectable } from '@nestjs/common';
import BCryptHashProvider from '../providers/HashProvider/implementations/BCryptHashProvider';

@Injectable()
class GetUserByIdService {
  constructor(
    @Inject('Prisma')
    private readonly prisma: PrismaService,

    @Inject('HashProvider')
    private readonly hashProvider: BCryptHashProvider,
  ) {}

  async execute(id: number): Promise<any> {
    const user = this.prisma.user.findUnique({
      where: {
        id,
      },
    });

    return user;
  }
}

export default GetUserByIdService;
