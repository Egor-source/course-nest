import {Injectable} from '@nestjs/common';
import {CreateUserDto} from './dto/create-user.dto';
import {UpdateUserDto} from './dto/update-user.dto';
import {InjectRepository} from "@nestjs/typeorm";
import {User} from "./entities/user.entity";
import {Repository} from "typeorm";
import * as bcrypt from 'bcrypt'
import {RolesService} from "../roles/roles.service";
import {DefaultService} from "../global/DefaultService";

@Injectable()
export class UsersService extends DefaultService<User>{
    constructor(
        @InjectRepository(User)
        protected repository: Repository<User>,
        private roleService: RolesService
    ) {
        super(repository);
    }

    async create(data: CreateUserDto) {
        const role = await this.roleService.findByName('user');
        const newUser = await this.repository.save({
            login: data.login,
            password: await bcrypt.hash(data.password, 1),
            roles: [role],
        })

        return newUser;
    }

    async findOneBy(where: object) {
        const user = await this.repository.findOneBy(where);
        return user
    }

    async update(id: number, data: UpdateUserDto) {
        if (data.password) {
            data.password = await bcrypt.hash(data.password, 1)
        }

        if (data.roles) {
            const promises = data.roles.map(async (role) => await this.roleService.findByName(role.name))
            const rolesFromDB = await Promise.all(promises);
            data.roles = rolesFromDB
        }

        const updatedUser = await this.repository.save({...data, id})

        return updatedUser;
    }

    async remove(id: number) {
        return await this.repository.delete(id);
    }
}
