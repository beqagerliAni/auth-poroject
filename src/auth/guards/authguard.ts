import { CanActivate, ExecutionContext, Inject, Injectable} from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { JwtService } from "@nestjs/jwt";
import { IS_PUBLIC_KEY } from "./publicKey";
import { Request } from "express";
import { JwtSecret } from "./secret/jwt-secret";
import { Roles_KEY } from "./roleskey";
import { Role } from "./enum/role.enum";

@Injectable()
export class AuthGurad implements CanActivate{
    constructor(private jwtService:JwtService, private reflector:Reflector){}
    async canActivate(context: ExecutionContext): Promise<boolean> {
        const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
            context.getHandler(),
            context.getClass(),
          ]);
        if(isPublic){
            return true
        }   
        const request =  context.switchToHttp().getRequest()
        const token  =  this.ExtractTokenFromHeaders(request)
        try {

            const payload  =  await this.jwtService.verifyAsync(
                token,
                {
                    secret:JwtSecret.secret
                }
            )
            const roles =  this.reflector.getAllAndOverride<Role[]>(Roles_KEY, [
                context.getHandler(),
                context.getClass(),
              ]);
                        
            return roles.some((role) => payload.userRole?.includes(role));

        }
        catch(err) {
            throw err
        }
        
    }
    private ExtractTokenFromHeaders(req:Request):string | undefined{
        const [type,token] = req.headers.authorization.split(' ')
        return type === 'Bearer' ? token : undefined;
    }
}