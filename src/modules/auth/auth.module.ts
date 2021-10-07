import BCryptHashProvider from '@modules/users/providers/HashProvider/implementations/BCryptHashProvider';
import UsersModule from '@modules/users/users.module';
import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PrismaService } from '../../shared/prisma/prisma.service';
import AuthController from './infra/http/controllers/AuthController.controller';
import JwtStrategy from './jwt.strategy';
import LocalStrategy from './local.strategy';
import RefreshTokenMiddleware from './middlewares/RefreshToken.middleware';
import GenerateRefreshToken from './providers/GenerateRefreshToken.provider';
import LoginService from './services/LoginService.service';

@Module({
  imports: [
    UsersModule,
    JwtModule.register({
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: '1h' },
    }),
  ],
  providers: [
    {
      provide: 'LoginService',
      useClass: LoginService,
    },
    {
      provide: 'HashProvider',
      useClass: BCryptHashProvider,
    },
    {
      provide: 'Prisma',
      useClass: PrismaService,
    },
    {
      provide: 'LocalStrategy',
      useClass: LocalStrategy,
    },
    {
      provide: 'JwtStrategy',
      useClass: JwtStrategy,
    },
    {
      provide: 'GenerateRefreshToken',
      useClass: GenerateRefreshToken,
    },
  ],
  controllers: [AuthController],
})
export class AuthModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(RefreshTokenMiddleware)
      .forRoutes({ path: 'auth/login', method: RequestMethod.GET });
  }
}
