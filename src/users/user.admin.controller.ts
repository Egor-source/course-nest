import {
    Body,
    Param,
    UsePipes,
} from '@nestjs/common';
import {UsersService} from './users.service';
import {CreateUserDto, CreateUserSchema} from './dto/create-user.dto';
import {UpdateUserDto, UpdateUserDtoRequest} from './dto/update-user.dto';
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

@AdminController({
    prefix: 'adminUsers',
    controllerLabel: 'Пользователи',
    options: {
        relationFields: [{
            fieldName: 'roles',
            multiple: true,
            displayValueFrom: 'name',
            paginateFrom: 'roles',
            paginateDisplayValueFrom: 'name',
        }],
    }
}, 'UsersAdmin')
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
    @AdminCreate({
        path: '/create',
        options: {
            body: {
                login: {
                    label: 'Логин',
                    require: true,
                },
                password: {
                    label: 'Пароль',
                    require: true,
                },
            }
        }
    })
    async create(@Body() data: CreateUserDto): Promise<ResponseUserFull> {
        const newUser = await this.usersService.create(data);
        return newUser
    }

    @ApiResponse({
        status: 200,
        description: 'Список всех пользователей',
        type: PaginateResultDto<ResponseUserFull>
    })
    @AdminPaginate({
        path: '/paginate'
    })
    async paginate(@Body() paginate: PaginateInfoDto): Promise<PaginateResultDto<ResponseUserFull>> {
        return this.usersService.paginate(paginate);
    }

    @ApiResponse({
        status: 200,
        description: 'Авторизация пользователя',
        type: ResponseTokens,
    })
    @AdminLogin({
        path: '/login',
        options: {
            body: {
                userId: {
                    label: '',
                    require: true,
                    field: 'id',
                }
            }
        }
    })
    async login(@Body() {userId}): Promise<ResponseTokens> {
        const user = await this.usersService.findOneBy({id: +userId})
        return this.authService.login({
            id: userId,
            login: user.login,
            roles: user.roles,
        } as UpdateUserDto)
    }

    @ApiResponse({
        status: 200,
        description: 'Обновление данных пользователя',
        type: ResponseUserFull,
    })
    @ApiBody({type: UpdateUserDto})
    @AdminUpdate({
        path: ':id',
        options: {
            params: {
                ':id': 'id',
            },
            body: {
                login: {
                    label: 'Логин',
                    require: false,
                    field: 'login',
                },
                password: {
                    label: 'Пароль',
                    require: false,
                    field: 'password'
                },
                roles: {
                    label: 'Роли',
                    require: false,
                    field: 'roles'
                }
            },
        }
    })
    async update(@Param('id') id: string, @Body() data: UpdateUserDtoRequest): Promise<ResponseUserFull> {
        return await this.usersService.update(+id, data);
    }

    @ApiResponse({
        status: 200,
        description: 'Удаление пользователя',
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
        return this.usersService.remove(+id);
    }
}
