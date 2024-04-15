// signin.dto.ts

// ! lib
// class-validator
import { IsString } from 'class-validator';

export class SignInDto {
  @IsString()
  readonly nicknameOrEmail: string;

  @IsString()
  readonly password: string;
}
