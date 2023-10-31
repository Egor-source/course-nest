import { Module } from '@nestjs/common';
import { RolesService } from './roles.service';
import { RolesAdminController } from './roles.admin.controller';
import {TypeOrmModule} from "@nestjs/typeorm";
import {Role} from "./entities/role.entity";

@Module({
  imports: [
    TypeOrmModule.forFeature([Role])
  ],
  controllers: [RolesAdminController],
  providers: [RolesService],
  exports: [RolesService],
})
export class RolesModule {}
