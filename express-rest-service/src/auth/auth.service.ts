import { Injectable } from '@nestjs/common';
import { CreateJWTTokenDto } from './dto';
import jwt from 'jsonwebtoken';

@Injectable()
export class AuthService {

    async createJWTToken(createJWTTokenDto: CreateJWTTokenDto): Promise<string> {
        return jwt.sign(createJWTTokenDto, process.env.JWT_SECRET);
    }
}
