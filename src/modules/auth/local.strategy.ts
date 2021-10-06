import LoginService from '@modules/auth/services/LoginService.service';
import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';

@Injectable()
class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(
    @Inject('LoginService')
    private readonly loginService: LoginService,
  ) {
    super({
      usernameField: 'email',
    });
  }

  async validate(email: string, password: string): Promise<any> {
    const user = await this.loginService.execute(email, password);
    if (!user) {
      throw new UnauthorizedException();
    }

    return user;
  }
}

export default LocalStrategy;
