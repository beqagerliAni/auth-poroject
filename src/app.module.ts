import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import *  as dotenv  from 'dotenv'
import { JwtModule } from '@nestjs/jwt';
import { JwtSecret } from './auth/guards/secret/jwt-secret';
import { database } from './config/config';
dotenv.config({path: '.env'})
@Module({
  imports: [TypeOrmModule.forRoot({
    type:'mysql',
    ...database,    
    synchronize:true,
    autoLoadEntities:true
  }),
  ConfigModule.forRoot({envFilePath:'.env'}),
  AuthModule, UsersModule,JwtModule.register({
    global: true,
    secret: JwtSecret.secret,
    signOptions: { expiresIn: '60d' },
  }),],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
