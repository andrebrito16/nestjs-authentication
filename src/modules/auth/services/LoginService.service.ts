import BCryptHashProvider from '@modules/users/providers/HashProvider/implementations/BCryptHashProvider';
import { HttpException, Inject, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from '../../../shared/prisma/prisma.service';
import GenerateRefreshToken from '../providers/GenerateRefreshToken.provider';

@Injectable()
export class AuthService {
  constructor(
    @Inject('Prisma')
    private readonly prisma: PrismaService,

    @Inject('HashProvider')
    private readonly hashProvider: BCryptHashProvider,
    private readonly jwtService: JwtService,

    @Inject('GenerateRefreshToken')
    private readonly generateRefreshToken: GenerateRefreshToken,
  ) {}

  public async execute(email: string, password: string): Promise<any> {
    const user = await this.prisma.user.findUnique({
      where: {
        email,
      },
    });

    if (await this.hashProvider.compareHash(password, user.password)) {
      // Generate token
      const payload = {
        id: user.id,
        email: user.email,
      };

      const refreshToken = await this.generateRefreshToken.execute(user.id);
      return {
        access_token: this.jwtService.sign(payload),
        refreshToken,
      };
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
