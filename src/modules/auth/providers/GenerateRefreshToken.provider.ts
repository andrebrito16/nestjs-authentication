import { PrismaService } from '../../../shared/prisma/prisma.service';
import { Inject, Injectable } from '@nestjs/common';
import * as dayjs from 'dayjs';

@Injectable()
class GenerateRefreshToken {
  constructor(
    @Inject('Prisma')
    private readonly prisma: PrismaService,
  ) {}

  async execute(userId: string): Promise<any> {
    const expiresIn = dayjs().add(15, 's').unix();

    const refreshTokenExists = await this.prisma.refreshToken.findFirst({
      where: {
        userId,
      },
    });

    if (refreshTokenExists) {
      await this.prisma.refreshToken.deleteMany({
        where: {
          userId,
        },
      });
    }

    const generateRefreshToken = await this.prisma.refreshToken.create({
      data: {
        userId,
        expiresIn,
      },
    });
    return generateRefreshToken;
  }
}

export default GenerateRefreshToken;
