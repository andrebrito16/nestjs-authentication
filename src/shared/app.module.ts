import { AuthModule } from '@modules/auth/auth.module';
import UsersModule from '@modules/users/users.module';
import { Module } from '@nestjs/common';

@Module({
  imports: [UsersModule, AuthModule],
})
export class AppModule {}
