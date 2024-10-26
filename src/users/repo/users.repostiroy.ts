import { InjectRepository } from "@nestjs/typeorm";
import { Users } from "../entity/users.entity";
import { Repository } from "typeorm";
import { CreateUsersDto } from "../dto/create-user-dto";
import { Injectable } from "@nestjs/common";
@Injectable()
export class UseresRepository{
    constructor(@InjectRepository(Users) private usersRepository:Repository<Users>){}
    async create(createUsersDto:CreateUsersDto){
        try{
            const newUser =  await this.usersRepository.create(createUsersDto)
            await this.usersRepository.save(newUser)
            delete newUser.password
            return newUser
        }
        catch(err){
            if(err.code = 'ER_DUP_ENTRY') {
                return "A user with this email already exists."
            }
            return err
        }
    }
    async findByName(mail:string){
        const user  =  await this.usersRepository.findOne({where: {mail}})
        return user
    }
    async findOne(id:number){
        const user =  await this.usersRepository.findOne({where:{id}})
        delete user.password
        return user
    }
}
   