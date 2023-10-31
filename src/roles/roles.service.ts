import {Injectable} from '@nestjs/common';
import {CreateRoleDto} from './dto/create-role.dto';
import {InjectRepository} from "@nestjs/typeorm";
import {Role} from "./entities/role.entity";
import {Repository} from "typeorm";
import {PaginateInfoDto} from "../dto/PaginateInfoDto";

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

   async remove(id: number) {
        return await this.repository.delete(id);
    }
}
