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

    async findByName(name: string) {
        const role = await this.repository.findOneBy({
            name,
        })
        return role;
    }

    async remove(id: number) {
        return await this.repository.delete(id);
    }
}
