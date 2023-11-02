import {Body, Param} from '@nestjs/common';
import {RolesService} from './roles.service';
import {CreateRoleDto} from './dto/create-role.dto';
import {ApiBody, ApiResponse} from "@nestjs/swagger";
import {Role} from "./entities/role.entity";
import {DeleteResult} from "typeorm";
import {AdminController} from "../decorators/admin/AdminController";
import {PaginateResultDto} from "../dto/PaginateResultDto";
import {PaginateInfoDto} from "../dto/PaginateInfoDto";
import {AdminCreate} from "../decorators/admin/AdminCreate";
import {AdminPaginate} from "../decorators/admin/AdminPaginate";
import {AdminDelete} from "../decorators/admin/AdminDelete";

@AdminController({
    prefix: 'adminRoles',
    controllerLabel: 'Роли',
}, 'AdminRoles')
export class RolesAdminController {
    constructor(private readonly rolesService: RolesService) {
    }

    @ApiResponse({
        status: 200,
        description: 'Создание роли',
        type: Role,
    })
    @ApiBody({type: CreateRoleDto})
    @AdminCreate({
        path: '/create',
        options: {
            body: {
                name: {
                    label:'Название роли',
                    require: true,
                }
            }
        }
    })
    create(@Body() createRoleDto: CreateRoleDto): Promise<Role> {
        return this.rolesService.create(createRoleDto);
    }

    @ApiResponse({
        status: 200,
        description: 'Список всех ролей',
        type: PaginateResultDto<Role>
    })
    @AdminPaginate({
        path: '/paginate',
    })
    async paginate(@Body() paginate: PaginateInfoDto): Promise<PaginateResultDto<Role>> {
        return this.rolesService.paginate(paginate);
    }

    @ApiResponse({
        status: 200,
        description: 'Удаление роли',
        type: DeleteResult,
    })
    @AdminDelete({
        path: ':id',
        options: {
            params: {
                ':id': 'id',
            }
        }
    })
    remove(@Param('id') id: string) {
        return this.rolesService.remove(+id);
    }
}
