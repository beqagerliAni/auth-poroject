import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UseresRepository } from 'src/users/repo/users.repostiroy';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';
import * as bcrypt from "bcrypt"
import { JwtService } from '@nestjs/jwt';
import { Users } from 'src/users/entity/users.entity';
import { JwtSecret } from './guards/secret/jwt-secret';
import { Role } from './guards/enum/role.enum';
@Injectable()
export class AuthService {
    constructor(
        private usersRepositroy:UseresRepository,
        private jwtService:JwtService
    ){}
    async register(registerDto:RegisterDto):Promise<Users>{
        
        const Rounds = 10;
        const hashedPassword:string =  await bcrypt.hash(registerDto.password,Rounds)

        registerDto.password = hashedPassword

        return await this.usersRepositroy.create(registerDto)
    }
    async login(loginDto:LoginDto):Promise<string>{
        const user:Users  =  await this.usersRepositroy.findByName(loginDto.mail)
        
        const checkPassword = user && await bcrypt.compare(loginDto.password, user.password);
        if(checkPassword) {
            const payload   =  {userId:user.id,userEmail:user.mail,userRole:Role.User}
            
            const  access_token:string =  await this.jwtService.signAsync(payload,
                {secret:JwtSecret.secret}
            )
            
            return access_token
            
        }
        throw new UnauthorizedException('password or email is wrong')
    }
}
