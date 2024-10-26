import { Column, Entity, PrimaryGeneratedColumn } from "typeorm"
@Entity()
export class Users {
    @PrimaryGeneratedColumn()
    id!:number

    @Column()
    password!:string

    @Column({unique:true})
    mail!:string
}