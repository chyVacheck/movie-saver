// auth.controller.ts

// ! lib
// nestjs
import {
  Controller,
  Post,
  Body,
  Res,
  HttpCode,
  HttpStatus,
  Req,
} from '@nestjs/common';
// express
import { Request, Response } from 'express';

// ? own
// dto
import { SignInDto } from './dto/signin.dto';
import { RegisterDto } from './dto/register.dto';
// service
import { AuthService } from './auth.service';
// constants
import { jwtConstants } from './constants';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  private _setTokenCookie(token: string, res: Response): void {
    res.cookie('jwt', token, jwtConstants.auth);
  }

  @HttpCode(HttpStatus.OK)
  @Post('check-token')
  async checkToken(@Req() req: Request) {
    const answer = await this.authService.checkToken(req.cookies.jwt);

    return {
      message: 'Token valid',
      data: {
        _id: answer.sub,
        nickname: answer.nickname,
      },
    };
  }

  @HttpCode(HttpStatus.OK)
  @Post('login')
  async signIn(@Body() signInDto: SignInDto, @Res() res: Response) {
    const answer = await this.authService.signIn(signInDto);

    this._setTokenCookie(answer.token, res);
    res.send({
      message: 'You successfully login',
      data: answer.user,
    });
  }

  @HttpCode(HttpStatus.CREATED)
  @Post('register')
  async register(@Body() registerDto: RegisterDto, @Res() res: Response) {
    const answer = await this.authService.register(registerDto);

    this._setTokenCookie(answer.token, res);
    res.send({
      message: 'You successfully registered',
      data: answer.user,
    });
  }
}
