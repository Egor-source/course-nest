import {
    Controller,
    Get,
    Post,
    Body,
    Patch,
    Param,
    Delete,
    UsePipes,
    UseGuards,
    Request,
    UnauthorizedException
} from '@nestjs/common';
import {AuthGuard} from '@nestjs/passport';
import {UsersService} from './users.service';
import {CreateUserDto, CreateUserSchema} from './dto/create-user.dto';
import {UpdateUserDto} from './dto/update-user.dto';
import {AuthService} from "../auth/auth.service";
import {JwtService} from "@nestjs/jwt";
import {TokenDto} from "./dto/token.dto";
// import {Post as userPosts} from '../posts/entities/post.entity'
import {ValidationPipe} from "../pipes/ValidationPipe";
import {RolesGuard} from "../guards/RolesGuard";
import {UpdateUserRoleDto} from "./dto/update-user-role.dto";
import {ApiBearerAuth, ApiBody,  ApiResponse, ApiTags} from "@nestjs/swagger";
import {ResponseUser} from "./types/ResponseUser";
import {ResponseTokens} from "./types/ResponseTokens";
import {DeleteResult} from "typeorm";

@ApiTags('Users')
@Controller('users')
export class UsersController {
    constructor(
        private readonly usersService: UsersService,
        private readonly authService: AuthService,
        private readonly jwtService: JwtService,
    ) {
    }

    @ApiResponse({
        status: 200,
        description: 'Регистрация пользователя',
        type: ResponseUser,
    })
    @ApiBody({type: CreateUserDto})
    @UsePipes(new ValidationPipe(CreateUserSchema))
    @Post()
    async create(@Body() data: CreateUserDto): Promise<ResponseUser> {
        const newUser = await this.usersService.create(data);
        return newUser
    }

    @ApiResponse({
        status: 200,
        description: 'Список всех пользователей',
        type: [ResponseUser],
    })
    @ApiBearerAuth()
    @UseGuards(new RolesGuard({
        roles: ['admin']
    }))
    @UseGuards(AuthGuard('jwt'))
    @Get()
    async findAll(@Request() req) : Promise<ResponseUser[]>{
        return await this.usersService.findAll();
    }

    @ApiResponse({
        status: 200,
        description: 'Авторизация пользователя',
        type: ResponseTokens,
    })
    @UseGuards(AuthGuard('local'))
    @Post('/login')
    login(@Request() req): Promise<ResponseTokens> {
        return this.authService.login(req.user)
    }

    @ApiResponse({
        status: 200,
        description: 'Обновление токена',
        type: ResponseTokens,
    })
    @ApiBody({type: TokenDto})
    @Post('/refreshTokens')
    refreshTokens(@Body() data: TokenDto):Promise<ResponseTokens> | UnauthorizedException{
        try {
            const {id, login} = this.jwtService.verify(data.token, {
                secret: process.env.JWT_REFRESH_SECRET,
            })
            return this.authService.login(new UpdateUserDto({id, login}))
        } catch (e) {
            return new UnauthorizedException()
        }
    }

    @ApiResponse({
        status: 200,
        description: 'Обновление данных пользователя',
        type: ResponseUser,
    })
    @ApiBearerAuth()
    @ApiBody({type: UpdateUserDto})
    @UseGuards(new RolesGuard({
        roles: ['admin'],
        userId: 'id',
    }))
    @UseGuards(AuthGuard('jwt'))
    @Patch(':id')
    async update(@Param('id') id: string, @Body() data: UpdateUserDto): Promise<ResponseUser> {
        return await this.usersService.update(+id, data);
    }

    @ApiResponse({
        status: 200,
        description: 'Обновление ролей пользователя',
        type: ResponseUser,
    })
    @ApiBearerAuth()
    @ApiBody({type: [UpdateUserRoleDto]})
    @UseGuards(new RolesGuard({
        roles: ['admin'],
    }))
    @UseGuards(AuthGuard('jwt'))
    @Patch('rolesUpdate/:id')
    async updateUserRoles(@Param('id') id: string, @Body() roles: UpdateUserRoleDto[]): Promise<ResponseUser> {
        return await this.usersService.updateUserRoles(+id, roles);
    }

    @ApiResponse({
        status: 200,
        description: 'Удаление пользователя',
        type: DeleteResult,
    })
    @ApiBearerAuth()
    @UseGuards(new RolesGuard({
        roles: ['admin'],
        userId: 'id',
    }))
    @UseGuards(AuthGuard('jwt'))
    @Delete(':id')
    remove(@Param('id') id: string) {
        return this.usersService.remove(+id);
    }
}
