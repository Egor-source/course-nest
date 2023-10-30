import {Injectable} from '@nestjs/common';
import {CreateUserDto} from './dto/create-user.dto';
import {UpdateUserDto} from './dto/update-user.dto';
import {InjectRepository} from "@nestjs/typeorm";
import {User} from "./entities/user.entity";
import {Repository} from "typeorm";
import * as bcrypt from 'bcrypt'
import {RolesService} from "../roles/roles.service";
import {UpdateUserRoleDto} from "./dto/update-user-role.dto";


@Injectable()
export class UsersService {
    constructor(
        @InjectRepository(User)
        private repository: Repository<User>,
        private roleService: RolesService
    ) {
    }

    async create(data: CreateUserDto){
        const role = await this.roleService.findByName('user');
        const newUser = await this.repository.save({
            login: data.login,
            password: await bcrypt.hash(data.password, 1),
            roles: [role],
        })

        return {
            id: newUser.id,
            login: newUser.login,
            roles: newUser.roles,
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

    async findOne(login: string) {
        const user = await this.repository.findOneBy({login});
        return user
    }

    async update(id: number, data: UpdateUserDto) {
        if (data.password) {
            data.password = await bcrypt.hash(data.password, 1)
        }

        if (data.roles) {
            delete data.roles;
        }

        const updatedUser = await this.repository.save({...data, id})

        return {
            id: updatedUser.id,
            login: updatedUser.login,
            roles: updatedUser.roles
        };
    }

    async updateUserRoles(id: number, roles: UpdateUserRoleDto[]) {
        const promises = roles.map(async (role) => await this.roleService.findByName(role.name))
        const rolesFromDB = await Promise.all(promises);

        const user = await this.repository.save({roles: rolesFromDB, id})

        return {
            id: user.id,
            login: user.login,
            roles: user.roles
        }
    }

    async remove(id: number) {
        return await this.repository.delete(id);
    }
}
