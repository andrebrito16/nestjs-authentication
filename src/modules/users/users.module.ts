import { Module } from '@nestjs/common';
import { PrismaService } from '../../shared/prisma/prisma.service';
import UsersController from './infra/http/controllers/Users.controller';
import BCryptHashProvider from './providers/HashProvider/implementations/BCryptHashProvider';
import CreateUserService from './services/CreateUser.service';

@Module({
  controllers: [UsersController],
  providers: [
    {
      provide: 'CreateUserService',
      useClass: CreateUserService,
    },
    {
      provide: 'Prisma',
      useClass: PrismaService,
    },
    {
      provide: 'HashProvider',
      useClass: BCryptHashProvider,
    },
  ],
})
export class UsersModule {}

export default UsersModule;
