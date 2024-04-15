// user.providers.ts

// ! lib
// mongoose
import { Mongoose } from 'mongoose';

// schemas
import { UserSchema } from './schemas/user.schema';

export const usersProviders = [
  {
    provide: 'USER_MODEL',
    useFactory: (mongoose: Mongoose) => mongoose.model('User', UserSchema),
    inject: ['DATABASE_CONNECTION'],
  },
];
