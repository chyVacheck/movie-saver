// user.interface.ts

// ! lib
// mongoose
import { Document } from 'mongoose';

export interface IUser extends Document {
  readonly nickname: string;
  readonly email: string;
  readonly isEmailChecked: boolean;
  readonly password: string;
  readonly firstName: string;
  readonly lastName: string;
  readonly status: 'admin' | 'user';
}
