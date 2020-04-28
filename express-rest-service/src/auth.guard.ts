import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import jwt from 'jsonwebtoken';

@Injectable()
export class AuthGuard implements CanActivate {
    canActivate(context: ExecutionContext): boolean {
        const request = context.switchToHttp().getRequest();
        if (!request.headers.authorization) throw new UnauthorizedException();
        try {
            jwt.verify((request.headers.authorization as string).split(' ')[1], process.env.JWT_SECRET);
            return true;
        } catch (e) {
            throw new UnauthorizedException();
        }
    }
}
