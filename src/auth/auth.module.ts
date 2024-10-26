import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UsersModule } from 'src/users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Users } from 'src/users/entity/users.entity';
import { UseresRepository } from 'src/users/repo/users.repostiroy';
import { JwtService } from '@nestjs/jwt';
import { AuthGurad } from './guards/authguard';
import { APP_GUARD } from '@nestjs/core';

@Module({
  imports:[TypeOrmModule.forFeature([Users])],
  providers: [AuthService,UseresRepository,JwtService,
    {
      provide: APP_GUARD,
      useClass: AuthGurad,
    }
  ],
  controllers: [AuthController],
})
export class AuthModule {}
