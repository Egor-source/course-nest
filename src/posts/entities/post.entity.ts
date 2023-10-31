import {Column, Entity, ManyToOne, PrimaryGeneratedColumn} from "typeorm";
import {User} from "../../users/entities/user.entity";
import {ApiProperty} from "@nestjs/swagger";

@Entity()
export class Post {
    @ApiProperty()
    @PrimaryGeneratedColumn()
    id: number;

    @ApiProperty()
    @Column()
    title: string;

    @ApiProperty()
    @Column({type: 'text'})
    text: string;

    @ApiProperty()
    @Column()
    userId: number

    @ApiProperty({
        type:()=>User
    })
    @ManyToOne(() => User, (user) => user.posts)
    user?: User;
}
