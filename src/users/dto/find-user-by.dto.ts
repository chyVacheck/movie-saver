// find-user-by-something.dto.ts

// ! lib
// class-validator
import { IsString, IsEmail } from 'class-validator';
// mongoose
import { ObjectId } from 'mongoose';

export class FindUserByNicknameDto {
  @IsString()
  readonly nickname: string;
}

export class FindUserByEmailDto {
  @IsEmail()
  readonly email: string;
}

export class FindUserByIdDto {
  @IsString()
  readonly id: ObjectId;
}
