import { Controller, Post, Body } from '@nestjs/common';
import { CreateJWTTokenDto } from './dto';
import { AuthService } from './auth.service';

@Controller('login')
export class AuthController {
    constructor(private authService: AuthService) { }

    @Post()
    async createJWTToken(@Body() createJWTTokenDto: CreateJWTTokenDto): Promise<string> {
        return this.authService.createJWTToken(createJWTTokenDto);
    }

}
