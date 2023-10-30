import {Controller, Get, Post, Body, Param, Delete, UseGuards} from '@nestjs/common';
import { RolesService } from './roles.service';
import { CreateRoleDto } from './dto/create-role.dto';
import {RolesGuard} from "../guards/RolesGuard";
import {AuthGuard} from "@nestjs/passport";
import {ApiBearerAuth, ApiBody, ApiResponse, ApiTags} from "@nestjs/swagger";
import {Role} from "./entities/role.entity";
import {DeleteResult} from "typeorm";

@ApiTags('Roles')
@Controller('roles')
export class RolesController {
  constructor(private readonly rolesService: RolesService) {}

  @ApiResponse({
    status: 200,
    description: 'Создание роли',
    type: Role,
  })
  @ApiBearerAuth()
  @ApiBody({type:CreateRoleDto})
  @UseGuards(new RolesGuard({
    roles: ['admin'],
  }))
  @UseGuards(AuthGuard('jwt'))
  @Post()
  create(@Body() createRoleDto: CreateRoleDto): Promise<Role> {
    return this.rolesService.create(createRoleDto);
  }

  @ApiResponse({
    status: 200,
    description: 'Роль по названию',
    type: Role,
  })
  @Get(':name')
  findOne(@Param('name') name: string): Promise<Role>  {
    return this.rolesService.findByName(name);
  }

  @ApiResponse({
    status: 200,
    description: 'Удаление роли',
    type: DeleteResult,
  })
  @ApiBearerAuth()
  @UseGuards(new RolesGuard({
    roles: ['admin'],
  }))
  @UseGuards(AuthGuard('jwt'))
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.rolesService.remove(+id);
  }
}
