import {Controller, Get, Post, Body, Param, Delete, UseGuards} from '@nestjs/common';
import { RolesService } from './roles.service';
import { CreateRoleDto } from './dto/create-role.dto';
import {RolesGuard} from "../guards/RolesGuard";
import {AuthGuard} from "@nestjs/passport";

@Controller('roles')
export class RolesController {
  constructor(private readonly rolesService: RolesService) {}

  @UseGuards(new RolesGuard({
    roles: ['admin'],
  }))
  @UseGuards(AuthGuard('jwt'))
  @Post()
  create(@Body() createRoleDto: CreateRoleDto) {
    return this.rolesService.create(createRoleDto);
  }

  @Get(':name')
  findOne(@Param('name') name: string) {
    return this.rolesService.findByName(name);
  }

  @UseGuards(new RolesGuard({
    roles: ['admin'],
  }))
  @UseGuards(AuthGuard('jwt'))
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.rolesService.remove(+id);
  }
}
