import { Controller, Post, Body, UnauthorizedException, Get, Request, UseGuards, Response, HttpStatus } from '@nestjs/common';
import { UsersService } from './user.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcryptjs';
// import { AuthGuard } from '@nestjs/passport';
import { AuthGuard } from '../auth/auth.guard';



@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService, private jwtService: JwtService) { }

  @Post('register')
  async register(@Body('user') user) {
    const createdUser = await this.usersService.create(user);
    const payload = { username: createdUser.username, email: createdUser.email };
    return {
      user: {
        username: createdUser.username,
        email: createdUser.email,
        token: this.jwtService.sign(payload),
        bio: "",
        image: ""
      }
    }
  }

  @Post('login')
  async login(@Response() res, @Body('user') userData) {
    const user = await this.usersService.findOne(userData.email);
    if (user && await bcrypt.compare(userData.password, user.password)) {
      const payload = { username: user.username, email: user.email };
      return res.status(HttpStatus.OK).json({
        user: {
          username: user.username,
          email: user.email,
          token: this.jwtService.sign(payload),
          bio: "",
          image: ""
        }
      })
    } else {
      return res.status(HttpStatus.UNAUTHORIZED).json({
        errors: {
          "email or password": ["is invalid"]
        }
      })
    }
  }

  @UseGuards(AuthGuard)
  @Get('profile')
  async getUser(@Request() req) {
    const user = await this.usersService.findOne(req.user.email);
    const payload = { username: user.username, email: user.email };
    return {
      user: {
        username: user.username,
        email: user.email,
        bio: "",
        image: "",
        token: this.jwtService.sign(payload),
      }
    }
  }
}