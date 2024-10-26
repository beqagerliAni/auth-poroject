import * as dotenv from  'dotenv'
dotenv.config({path: '.env'})
export const database  = {
    username:process.env.DB_USERNAME,
    database:process.env.DB_DATABSENAME,
    host:process.env.DB_HOST,
    port:+process.env.DB_PORT,
    password:process.env.DB_PASSWORD,
} 