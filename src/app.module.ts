// app.module.ts

// ! modules
// nestjs
import { Module } from '@nestjs/common';

// ? users
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [UsersModule, AuthModule],
})
export class AppModule {}
