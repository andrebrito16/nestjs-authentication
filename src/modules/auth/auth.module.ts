import BCryptHashProvider from '@modules/users/providers/HashProvider/implementations/BCryptHashProvider';
import UsersModule from '@modules/users/users.module';
import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { PrismaService } from '../../shared/prisma/prisma.service';
import AuthController from './infra/http/controllers/AuthController.controller';
import SessionSerializer from './infra/serializers/session.serializer';
import LocalStrategy from './local.strategy';
import LoginService from './services/LoginService.service';

@Module({
  imports: [UsersModule, PassportModule.register({ session: true })],
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
      provide: 'SessionSerializer',
      useClass: SessionSerializer,
    },
  ],
  controllers: [AuthController],
})
export class AuthModule {}
