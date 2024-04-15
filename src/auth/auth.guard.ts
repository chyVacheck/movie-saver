// auth.guard.ts

// ! lib
// nestjs
import {
  CanActivate,
  Injectable,
  ExecutionContext,
  UnauthorizedException,
} from '@nestjs/common';
// express
import { Request } from 'express';

// ? own
// service
import { AuthService } from './auth.service';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const req: Request = context.switchToHttp().getRequest();
    if (!req.cookies.jwt) {
      throw new UnauthorizedException('Token required');
    }

    const answer = await this.authService.checkToken(req.cookies.jwt);

    req['user'] = answer;
    return true;
  }
}
