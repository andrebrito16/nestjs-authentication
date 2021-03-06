import { Injectable } from '@nestjs/common';
import { compare, hash } from 'bcryptjs';
import IHashProvider from '../models/IHashProvider';

@Injectable()
class BCryptHashProvider implements IHashProvider {
  public async generateHash(payload: string): Promise<string> {
    return hash(payload, 10);
  }

  public async compareHash(payload: string, hashed: string): Promise<boolean> {
    return await compare(payload, hashed);
  }
}

export default BCryptHashProvider;
