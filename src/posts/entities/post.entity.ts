import {Column, Entity, ManyToOne, PrimaryGeneratedColumn} from "typeorm";
import {User} from "../../users/entities/user.entity";

@Entity()
export class Post {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    title: string;

    @Column({type: 'text'})
    text: string;

    @Column()
    userId: number

    @ManyToOne(() => User, (user) => user.posts, {eager: true})
    user: User;
}
