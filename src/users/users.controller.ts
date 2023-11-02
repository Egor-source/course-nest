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
import {UpdateUserDto, UpdateUserDtoRequest} from './dto/update-user.dto';
import {AuthService} from "../auth/auth.service";
import {JwtService} from "@nestjs/jwt";
import {TokenDto} from "./dto/token.dto";
import {ValidationPipe} from "../pipes/ValidationPipe";
import {UserGuard} from "../guards/UserGuard";
import {ApiBearerAuth, ApiBody, ApiResponse, ApiTags} from "@nestjs/swagger";
import {ResponseUser} from "./types/ResponseUser";
import {ResponseTokens} from "./types/ResponseTokens";
import {DeleteResult} from "typeorm";
import {LoginDto} from "./dto/login.dto";

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
        return {
            id: newUser.id,
            login: newUser.login,
            roles: newUser.roles
        }
    }

    @ApiResponse({
        status: 200,
        description: 'Авторизация пользователя',
        type: ResponseTokens,
    })
    @UseGuards(AuthGuard('local'))
    @Post('/login')
    login(@Request() req): LoginDto {
        return this.authService.login(req.user)
    }

    @ApiResponse({
        status: 200,
        description: 'Возвращает авторизованого пользователя ',
        type: ResponseUser,
    })
    @UseGuards(AuthGuard('jwt'))
    @Get('/authUser')
    authUser(@Request() req): Promise<ResponseUser> {
        return req.user
    }

    @ApiResponse({
        status: 200,
        description: 'Обновление токена',
        type: ResponseTokens,
    })
    @ApiBody({type: TokenDto})
    @Post('/refreshTokens')
    refreshTokens(@Body() data: TokenDto): LoginDto | UnauthorizedException {
        try {
            const user = this.jwtService.verify(data.token, {
                secret: process.env.JWT_REFRESH_SECRET,
            })
            user.roles = JSON.parse(user.roles)
            return this.authService.login(user)
        } catch (e) {
            throw new UnauthorizedException()
        }
    }

    @ApiResponse({
        status: 200,
        description: 'Обновление данных пользователя',
        type: ResponseUser,
    })
    @ApiBearerAuth()
    @ApiBody({type: UpdateUserDto})
    @UseGuards(new UserGuard('id'))
    @UseGuards(AuthGuard('jwt'))
    @Patch(':id')
    async update(@Param('id') id: string, @Body() data: UpdateUserDtoRequest): Promise<ResponseUser> {
        if (data.roles) {
            delete data.roles;
        }
        const user = await this.usersService.update(+id, data);
        return {
            id: user.id,
            login: user.login,
            roles: user.roles
        }
    }

    @ApiResponse({
        status: 200,
        description: 'Удаление пользователя',
        type: DeleteResult,
    })
    @ApiBearerAuth()
    @UseGuards(new UserGuard('id'))
    @UseGuards(AuthGuard('jwt'))
    @Delete(':id')
    remove(@Param('id') id: string) {
        return this.usersService.remove(+id);
    }
}
