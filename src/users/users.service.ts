import {Injectable} from '@nestjs/common';
import {CreateUserDto} from './dto/create-user.dto';
import {UpdateUserDto, UpdateUserDtoRequest} from './dto/update-user.dto';
import {InjectRepository} from "@nestjs/typeorm";
import {User} from "./entities/user.entity";
import {Repository} from "typeorm";
import * as bcrypt from 'bcrypt'
import {RolesService} from "../roles/roles.service";
import {DefaultService} from "../global/DefaultService";
import {Role} from "../roles/entities/role.entity";

@Injectable()
export class UsersService extends DefaultService<User> {
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

    async update(id: number, data: UpdateUserDtoRequest) {
        if (data.password) {
            data.password = await bcrypt.hash(data.password, 1)
        }
        let roles
        if (data.roles) {
            const promises = data.roles.map(async (roleId) => await this.roleService.findById(roleId))
            const rolesFromDB = await Promise.all(promises);
            roles = rolesFromDB;
            delete data.roles
        }

        const updatedUser = await this.repository.save({...data, roles, id})

        return updatedUser;
    }
}
