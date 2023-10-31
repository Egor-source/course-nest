import {
    Body,
    Param,
    UsePipes,
    UseGuards,
    Request, SetMetadata,
} from '@nestjs/common';
import {AuthGuard} from '@nestjs/passport';
import {UsersService} from './users.service';
import {CreateUserDto, CreateUserSchema} from './dto/create-user.dto';
import {UpdateUserDto} from './dto/update-user.dto';
import {AuthService} from "../auth/auth.service";
import {ValidationPipe} from "../pipes/ValidationPipe";
import {ApiBody, ApiResponse} from "@nestjs/swagger";
import {ResponseUserFull} from "./types/ResponseUserFull";
import {ResponseTokens} from "./types/ResponseTokens";
import {DeleteResult} from "typeorm";
import {AdminController} from "../decorators/admin/AdminController";
import {PaginateInfoDto} from "../dto/PaginateInfoDto";
import {PaginateResultDto} from "../dto/PaginateResultDto";
import {AdminCreate} from "../decorators/admin/AdminCreate";
import {AdminPaginate} from "../decorators/admin/AdminPaginate";
import {AdminLogin} from "../decorators/admin/AdminLogin";
import {AdminUpdate} from "../decorators/admin/AdminUpdate";
import {AdminDelete} from "../decorators/admin/AdminDelete";

@AdminController('adminUsers', 'Пользователи', 'UsersAdmin')
export class UsersAdminController {
    constructor(
        private readonly usersService: UsersService,
        private readonly authService: AuthService,
    ) {
    }

    @ApiResponse({
        status: 200,
        description: 'Регистрация пользователя',
        type: ResponseUserFull,
    })
    @ApiBody({type: CreateUserDto})
    @UsePipes(new ValidationPipe(CreateUserSchema))
    @AdminCreate()
    async create(@Body() data: CreateUserDto): Promise<ResponseUserFull> {
        const newUser = await this.usersService.create(data);
        return newUser
    }

    @ApiResponse({
        status: 200,
        description: 'Список всех пользователей',
        type: PaginateResultDto<ResponseUserFull>
    })
    @AdminPaginate('/paginate')
    async paginate(@Body() paginate: PaginateInfoDto): Promise<PaginateResultDto<ResponseUserFull>> {
        return this.usersService.paginate(paginate);
    }

    @ApiResponse({
        status: 200,
        description: 'Авторизация пользователя',
        type: ResponseTokens,
    })
    @UseGuards(AuthGuard('local'))
    @AdminLogin('/login')
    login(@Request() req): Promise<ResponseTokens> {
        return this.authService.login(req.user)
    }

    @ApiResponse({
        status: 200,
        description: 'Обновление данных пользователя',
        type: ResponseUserFull,
    })
    @ApiBody({type: UpdateUserDto})
    @AdminUpdate(':id')
    async update(@Param('id') id: string, @Body() data: UpdateUserDto): Promise<ResponseUserFull> {
        return await this.usersService.update(+id, data);
    }

    @ApiResponse({
        status: 200,
        description: 'Удаление пользователя',
        type: DeleteResult,
    })
    @AdminDelete(':id')
    remove(@Param('id') id: string) {
        return this.usersService.remove(+id);
    }
}
