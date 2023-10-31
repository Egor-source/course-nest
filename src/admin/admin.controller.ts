import {Controller, Get, UseGuards} from '@nestjs/common';
import {AdminService} from './admin.service';
import {AuthGuard} from "@nestjs/passport";
import {RolesGuard} from "../guards/RolesGuard";
import {ApiTags} from "@nestjs/swagger";

@UseGuards(new RolesGuard(['admin']))
@UseGuards(AuthGuard('jwt'))
@ApiTags('Admin')
@Controller('admin')
export class AdminController {
    constructor(private readonly adminService: AdminService) {
    }

    @Get()
    async adminPaths() {
        return await this.adminService.getAdminControllersPaths();
    }
}
