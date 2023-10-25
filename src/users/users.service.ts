import {Injectable} from '@nestjs/common';
import {CreateUserDto} from './dto/create-user.dto';
import {UpdateUserDto} from './dto/update-user.dto';
import {InjectRepository} from "@nestjs/typeorm";
import {User} from "./entities/user.entity";
import {Repository} from "typeorm";
import * as bcrypt from 'bcrypt'
import {RolesService} from "../roles/roles.service";


@Injectable()
export class UsersService {
    constructor(
        @InjectRepository(User)
        private repository: Repository<User>,
        private roleService: RolesService
    ) {
    }

    async create(data: CreateUserDto) {
        const role = await this.roleService.findByName('user');
        const newUser = await this.repository.save({
            login: data.login,
            password: await bcrypt.hash(data.password, 1),
            roles:[role],
        })

        return {
            id: newUser.id,
            login: newUser.login,
            roles:newUser.roles,
        };
    }

    async findAll() {
        const users = await this.repository.find();
        return users.map((user) => ({
            id: user.id,
            login: user.login,
            roles: user.roles,
        }));
    }

    async findOne(login: string){
        const user = await this.repository.findOneBy({login});
        return user
    }

    async update(id: number, data: UpdateUserDto) {
        if (data.password) {
            data.password = await bcrypt.hash(data.password, 1)
        }
        const updatedUser = await this.repository.save({...data, id})

        return {
            id: updatedUser.id,
            login: updatedUser.login,
            roles: updatedUser.roles,
        };
    }

    async remove(id: number) {
        return await this.repository.delete(id);
    }

    async userPosts(userId: number) {
        const user = await this.repository.findOneBy({id: userId})
        const posts = await user.posts
        return posts.map((post) => {
            delete post.user
            return post
        })
    }
}
