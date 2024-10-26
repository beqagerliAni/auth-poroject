import * as dotenv from 'dotenv'
dotenv.config({path: '.env'})
export const JwtSecret = {
    secret:process.env.JWT_SECRET
}