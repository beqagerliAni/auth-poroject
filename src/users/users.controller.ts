import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUsersDto } from './dto/create-user-dto';
import { Roles } from 'src/auth/guards/roleskey';
import { Role } from 'src/auth/guards/enum/role.enum';

@Controller('users')
export class UsersController {
    constructor(private usersService:UsersService) {}
    @Post()
    @Roles(Role.User)
    async create(@Body() createUsersDto:CreateUsersDto){
        return await this.usersService.create(createUsersDto)
    }
    @Get(":id")
    @Roles(Role.User)
    async findOne(@Param('id') id:string){
        return await this.usersService.findOne(Number(id))
    }
}