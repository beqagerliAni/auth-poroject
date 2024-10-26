import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Users } from './entity/users.entity';
import { UseresRepository } from './repo/users.repostiroy';

@Module({
  imports:[TypeOrmModule.forFeature([Users])],
  providers: [UsersService,UseresRepository],
  controllers: [UsersController],
})
export class UsersModule {}
