import { JwtService } from '@nestjs/jwt';
import { PrismaService } from './../../../shared/prisma/prisma.service';
import { Inject, Injectable } from '@nestjs/common';

@Injectable()
class RefreshTokenService {
  constructor(
    @Inject('Prisma')
    private readonly prisma: PrismaService,
    private readonly jwtService: JwtService,
  ) {}
  async execute(refresh_token: string): Promise<any> {
    const refreshToken = await this.prisma.refreshToken.findFirst({
      where: {
        id: refresh_token,
      },
    });

    if (!refreshToken) {
      throw new Error('Refresh token not found');
    }

    const token = this.jwtService.sign(refreshToken.userId);

    return { token };
  }
}

export default RefreshTokenService;
