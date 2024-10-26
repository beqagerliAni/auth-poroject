import { Injectable } from '@nestjs/common';
import { CreateUsersDto } from './dto/create-user-dto';
import { UseresRepository } from './repo/users.repostiroy';
@Injectable()
export class UsersService {
    constructor(private usersRepository:UseresRepository){}
    async create(createUsersDto:CreateUsersDto){
        return await this.usersRepository.create(createUsersDto)
    }
    async findOne(id:number){
        return await this.usersRepository.findOne(id)
    }
}
