import {Injectable} from '@nestjs/common';
import {CreateRoleDto} from './dto/create-role.dto';
import {InjectRepository} from "@nestjs/typeorm";
import {Role} from "./entities/role.entity";
import {Repository} from "typeorm";

@Injectable()
export class RolesService {
    constructor(
        @InjectRepository(Role)
        private repository: Repository<Role>
    ) {
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
