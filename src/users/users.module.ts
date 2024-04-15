// user.module.ts

// ! lib
// nestjs
import { Module } from '@nestjs/common';

// ? database
import { DatabaseModule } from '@db/database.module';

// ? auth
import { AuthService } from '@src/auth/auth.service';

// ? own
// controller
import { UsersController } from './users.controller';
// providers
import { usersProviders } from './users.providers';
// service
import { UsersService } from './users.service';

@Module({
  imports: [DatabaseModule],
  controllers: [UsersController],
  providers: [UsersService, ...usersProviders, AuthService],
  exports: [UsersService],
})
export class UsersModule {}
