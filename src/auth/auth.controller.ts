import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';
import { Public } from './guards/publicKey';

@Controller('auth')
export class AuthController {
    constructor(private authService:AuthService) {}
    @Public()
    @Post('register')
    async register(@Body() registerDto:RegisterDto){
        return await this.authService.register(registerDto)
    }
    @Public()
    @Post('login')
    async login(@Body() loginDto:LoginDto){
        return  await this.authService.login(loginDto)
    }
}
