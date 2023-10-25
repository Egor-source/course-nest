import {Column, Entity, JoinTable, ManyToMany, PrimaryGeneratedColumn} from "typeorm";
import {User} from "../../users/entities/user.entity";

@Entity()
export class Role {
    @PrimaryGeneratedColumn()
    id: number

    @Column({
        nullable:false,
    })
    name: string
    @ManyToMany(()=> User, (user)=>user.id)
    @JoinTable()
    users: User[]
}
