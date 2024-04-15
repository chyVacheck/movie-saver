// user.schema.ts

// ! lib
// mongoose
import * as mongoose from 'mongoose';

export const UserSchema = new mongoose.Schema({
  nickname: {
    require: true,
    unique: true,
    type: String,
  },
  email: {
    require: true,
    unique: true,
    type: String,
  },
  isEmailChecked: {
    type: Boolean,
    default: false,
  },
  password: {
    require: true,
    type: String,
    select: false,
  },
  firstName: {
    type: String,
  },
  lastName: {
    type: String,
  },
  status: {
    type: String,
    enum: ['admin', 'user'],
    default: 'user',
  },
});
