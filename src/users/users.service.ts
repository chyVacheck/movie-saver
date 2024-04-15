// user.service.ts

// ! lib
// nestjs
import {
  BadRequestException,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
// mongoose
import { Model } from 'mongoose';
import { isValidObjectId } from 'mongoose';
// bcryptjs
import { hashSync } from 'bcryptjs';

// ? auth
// dto
import { RegisterDto as CreateUserDto } from '@src/auth/dto/register.dto';

// ? own

// dto
import {
  FindUserByEmailDto,
  FindUserByNicknameDto,
  FindUserByIdDto,
} from './dto/find-user-by.dto';
// interfaces
import { IUser } from './interfaces/user.interface';

@Injectable()
export class UsersService {
  constructor(
    @Inject('USER_MODEL')
    private readonly userModel: Model<IUser>,
  ) {}

  private async _findOneBySomethingWithPassword(
    findUserBySomethingDto: FindUserByEmailDto | FindUserByNicknameDto,
  ): Promise<IUser> {
    const user = await this.userModel
      .findOne(findUserBySomethingDto)
      .select('+password');

    return user;
  }

  async findAll(): Promise<IUser[]> {
    const users = await this.userModel.find().exec();
    return users;
  }

  async findOneById(findUserByIdDto: FindUserByIdDto): Promise<IUser> {
    if (!isValidObjectId(findUserByIdDto.id)) {
      throw new BadRequestException('id must be 24 length hex sting');
    }
    const user = await this.userModel.findById(findUserByIdDto.id);

    // if can not fount user
    if (!user) {
      throw new NotFoundException(
        `User with id [${findUserByIdDto.id}] not found`,
      );
    }
    return user;
  }

  async findOneByEmailWithPassword(
    findUserByEmailDto: FindUserByEmailDto,
  ): Promise<IUser> {
    return this._findOneBySomethingWithPassword(findUserByEmailDto);
  }

  async findOneByNicknameWithPassword(
    findUserByNicknameDto: FindUserByNicknameDto,
  ): Promise<IUser> {
    return this._findOneBySomethingWithPassword(findUserByNicknameDto);
  }

  async createOne(createUserDto: CreateUserDto): Promise<IUser> {
    const hashedPassword = hashSync(createUserDto.password, 10);
    const userDataToCreate = { ...createUserDto, password: hashedPassword };
    const user = this.userModel.create(userDataToCreate);

    return user;
  }
}
