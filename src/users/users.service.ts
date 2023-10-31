import {Injectable} from '@nestjs/common';
import {CreateUserDto} from './dto/create-user.dto';
import {UpdateUserDto} from './dto/update-user.dto';
import {InjectRepository} from "@nestjs/typeorm";
import {User} from "./entities/user.entity";
import {Repository} from "typeorm";
import * as bcrypt from 'bcrypt'
import {RolesService} from "../roles/roles.service";
import {PaginateInfoDto} from "../dto/PaginateInfoDto";


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
            roles: [role],
        })

        return newUser;
    }

    async paginate(paginate: PaginateInfoDto) {
        const [data, total] = await this.repository.findAndCount({
            take: paginate.count,
            skip: paginate.perPage * paginate.count,
        })
        return {
            data,
            total,
            currentPage: paginate.perPage,
        };
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
