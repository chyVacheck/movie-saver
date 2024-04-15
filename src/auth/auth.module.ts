// auth.module.ts

// ! lib
// nestjs
import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';

// ? users
import { UsersModule } from '@src/users/users.module';

// ? own
// controller
import { AuthController } from './auth.controller';
// service
import { AuthService } from './auth.service';
// constants
import { jwtConstants } from './constants';

@Module({
  imports: [
    UsersModule,
    JwtModule.register({
      global: true,
      secret: jwtConstants.secret,
      signOptions: { expiresIn: 3600_000 },
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService],
  exports: [AuthService],
})
export class AuthModule {}
