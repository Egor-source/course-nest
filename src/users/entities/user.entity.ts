import {Column, Entity, JoinTable, ManyToMany, OneToMany, PrimaryGeneratedColumn} from "typeorm";
import {Post} from "../../posts/entities/post.entity";
import {Role} from "../../roles/entities/role.entity";
import {ApiProperty} from "@nestjs/swagger";

@Entity()
export class User {
    @ApiProperty()
    @PrimaryGeneratedColumn()
    id: number;

    @ApiProperty()
    @Column()
    login: string;

    @ApiProperty()
    @Column()
    password: string;

    @ApiProperty({
        type:[Post]
    })
    @OneToMany(() => Post, (post) => post.user,{
        onUpdate:'CASCADE',
        onDelete:'CASCADE',
    })
    posts: Promise<Post[]>;

    @ApiProperty({
        type:[Role]
    })
    @ManyToMany(()=> Role, (role)=>role.id,{
        eager: true
    })
    @JoinTable()
    roles:Role[]
}

