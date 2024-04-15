// register.dto.ts

// ! lib
// class-validator
import { IsString, IsEmail, IsOptional } from 'class-validator';

export class RegisterDto {
  @IsString()
  readonly nickname: string;

  @IsEmail()
  readonly email: string;

  @IsString()
  readonly password: string;

  @IsOptional()
  @IsString()
  readonly firstName?: string;

  @IsOptional()
  @IsString()
  readonly lastName?: string;
}
