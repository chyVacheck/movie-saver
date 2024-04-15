// jwt.interface.ts

// ! lib
// mongoose
import { Document, ObjectId } from 'mongoose';

export interface IJwt extends Document {
  sub: ObjectId;
  nickname: string;
  iat: number;
  exp: number;
}
