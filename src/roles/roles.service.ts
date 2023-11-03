import {Injectable} from '@nestjs/common';
import {CreateRoleDto} from './dto/create-role.dto';
import {InjectRepository} from "@nestjs/typeorm";
import {Role} from "./entities/role.entity";
import {Repository} from "typeorm";
import {DefaultService} from "../global/DefaultService";

@Injectable()
export class RolesService extends DefaultService<Role> {
    constructor(
        @InjectRepository(Role)
        protected repository: Repository<Role>
    ) {
        super(repository)
    }

    async create(createRoleDto: CreateRoleDto) {
        const role = await this.repository.save(createRoleDto)
        return role
    }

    async findById(id: number) {
        const role = await this.repository.findOneBy({
            id
        })
        return role;
    }

    async findAll(where: [] | object) {
        const roles = await this.repository.find({
            where
        });
        return roles
    }

    async findByName(name: string) {
        const role = await this.repository.findOneBy({
            name,
        })
        return role;
    }
}
