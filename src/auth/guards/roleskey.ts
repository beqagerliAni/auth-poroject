import { SetMetadata } from "@nestjs/common";
import { Role } from "./enum/role.enum";
export const Roles_KEY =  'roles'
export const Roles = (...roles:Role[]) => SetMetadata(Roles_KEY,roles)