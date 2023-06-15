import { Injectable } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService
  ) {}

  async validateUser(username: string, password: string) {
    return await this.userService.validateUser(username, password);
  }

  async register(user: any) {
    const {username, password} = user;
    const found = await this.userService.findOne(username);
    if(found) {
      // Throw error if user already exists
      throw new Error('User already exists');
    }
    return this.userService.create(username, password);
  }

  async login(user: any) {
    const payload = { username: user.username, sub: user.userId };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}