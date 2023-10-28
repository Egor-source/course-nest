import {Column, Entity, JoinTable, ManyToMany, OneToMany, PrimaryGeneratedColumn} from "typeorm";
import {Post} from "../../posts/entities/post.entity";
import {Role} from "../../roles/entities/role.entity";

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    login: string;

    @Column()
    password: string;

    @OneToMany(() => Post, (post) => post.user,{
        onUpdate:'CASCADE',
        onDelete:'CASCADE',
    })
    posts: Promise<Post[]>;

    @ManyToMany(()=> Role, (role)=>role.id,{
        eager: true
    })
    @JoinTable()
    roles:Role[]
}

