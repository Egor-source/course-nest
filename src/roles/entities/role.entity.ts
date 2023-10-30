import {Column, Entity, JoinTable, ManyToMany, PrimaryGeneratedColumn} from "typeorm";
import {User} from "../../users/entities/user.entity";
import {ApiProperty} from "@nestjs/swagger";

@Entity()
export class Role {
    @ApiProperty()
    @PrimaryGeneratedColumn()
    id: number

    @ApiProperty()
    @Column({
        nullable:false,
    })
    name: string
}
