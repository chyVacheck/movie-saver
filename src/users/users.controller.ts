// user.controller.ts

// ! lib
// nestjs
import { Controller, Get, Param, Req, UseGuards } from '@nestjs/common';
// express
import { Request } from 'express';

// ? auth
import { AuthGuard } from '@src/auth/auth.guard';
import { IJwt } from '@src/auth/interfaces/jwt.interface';

// ? own

// dto
import { FindUserByIdDto } from './dto/find-user-by.dto';
// interfaces
import { IUser } from './interfaces/user.interface';
// service
import { UsersService } from './users.service';

interface AuthenticatedRequest extends Request {
  user: IJwt;
}

@Controller('users')
export class UsersController {
  constructor(private readonly userService: UsersService) {}

  // ? GET

  @UseGuards(AuthGuard)
  @Get()
  async findAllUsers() {
    const users: IUser[] = await this.userService.findAll();

    return { data: users };
  }

  @UseGuards(AuthGuard)
  @Get('/me')
  async findCurrentUser(@Req() req: AuthenticatedRequest) {
    const user = await this.userService.findOneById({ id: req.user.sub });

    return { data: user };
  }

  @UseGuards(AuthGuard)
  @Get('/:id')
  async findOneUserById(@Param() findUserByIdDto: FindUserByIdDto) {
    const user = await this.userService.findOneById({ id: findUserByIdDto.id });

    return { data: user };
  }
}
