// auth.service.ts

// ! lib
// nestjs
import {
  Injectable,
  BadRequestException,
  UnauthorizedException,
  ConflictException,
  NotFoundException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

// bcryptjs
import { compare } from 'bcryptjs';

// ? own
// dto
import { RegisterDto } from './dto/register.dto';
import { SignInDto } from './dto/signin.dto';
import { IJwt } from './interfaces/jwt.interface';

// ? users
import { UsersService } from '@src/users/users.service';
// interfaces
import { IUser } from '@src/users/interfaces/user.interface';
import { isEmail } from 'class-validator';

interface IAuth {
  token: string;
  user: IUser;
}

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  private async _generateToken(payload: object): Promise<string> {
    return await this.jwtService.signAsync(payload);
  }

  private async _generateAuthToken(user: IUser): Promise<string> {
    const { _id, nickname } = user;
    return await this._generateToken({ sub: _id, nickname });
  }

  private _copyUserWithoutPassword(user: IUser): IUser {
    const data = JSON.parse(JSON.stringify(user));
    delete data.password;
    return data;
  }

  async checkToken(token: string): Promise<IJwt> {
    return await this.jwtService
      .verifyAsync(token, { ignoreExpiration: false })
      .catch((error) => {
        throw new UnauthorizedException(error.message);
      });
  }

  // check if pass is valid and return user info
  async signIn(signInDto: SignInDto): Promise<IAuth> {
    let type: 'email' | 'nickname' = 'email';
    let user: IUser;

    // check if value is email
    if (isEmail(signInDto.nicknameOrEmail)) {
      // try find by email
      user = await this.usersService.findOneByEmailWithPassword({
        email: signInDto.nicknameOrEmail,
      });
    } else {
      // if not then try to find user by nickname
      user = await this.usersService.findOneByNicknameWithPassword({
        nickname: signInDto.nicknameOrEmail,
      });
      type = 'nickname';
    }

    // if not, then send error
    if (!user) {
      throw new NotFoundException(
        `Not found user by ${type} [${signInDto.nicknameOrEmail}]`,
      );
    }

    const isPasswordCorrect = await compare(signInDto.password, user.password);

    if (!isPasswordCorrect) {
      throw new BadRequestException('Password is not correct');
    }

    const token = await this._generateAuthToken(user);
    const data = this._copyUserWithoutPassword(user);

    return {
      token: token,
      user: data,
    };
  }

  // create a new user
  async register(registerDto: RegisterDto): Promise<IAuth> {
    try {
      const user = await this.usersService.createOne(registerDto);
      const token = await this._generateAuthToken(user);
      const data = this._copyUserWithoutPassword(user);

      return {
        token: token,
        user: data,
      };
    } catch (err) {
      if (err.code === 11000) {
        throw new ConflictException(
          `User with this ${Object.keys(err.keyValue)[0]} already exists`,
        );
      } else {
        throw err;
      }
    }
  }
}
