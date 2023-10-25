import {Controller, Get, Post, Body, Patch, Param, Delete, UsePipes, UseGuards, Request, UnauthorizedException} from '@nestjs/common';
import {AuthGuard} from '@nestjs/passport';
import {UsersService} from './users.service';
import {CreateUserDto, CreateUserSchema} from './dto/create-user.dto';
import {UpdateUserDto} from './dto/update-user.dto';
import {AuthService} from "../auth/auth.service";
import {JwtService} from "@nestjs/jwt";
import {TokenDto} from "./dto/token.dto";
import {ValidationPipe} from "../pipes/ValidationPipe";

@Controller('users')
export class UsersController {
    constructor(
        private readonly usersService: UsersService,
        private readonly authService: AuthService,
        private readonly jwtService: JwtService,
    ) {
    }

    @UsePipes(new ValidationPipe(CreateUserSchema))
    @Post()
    async create(@Body() data: CreateUserDto) {
        const newUser = await this.usersService.create(data);
        return newUser
    }

    @UseGuards(AuthGuard('jwt'))
    @Get()
    async findAll() {
        return await this.usersService.findAll();
    }

    @UseGuards(AuthGuard('local'))
    @Post('/login')
    login(@Request() req) {
        return this.authService.login(req.user)
    }

    @Post('/refreshTokens')
    refreshTokens(@Body() data: TokenDto) {
        try {
            const {id, login} = this.jwtService.verify(data.token, {
                secret: process.env.JWT_REFRESH_SECRET,
            })
            return this.authService.login(new UpdateUserDto({id, login}))
        } catch (e) {
            return new UnauthorizedException()
        }
    }

    @Patch(':id')
    async update(@Param('id') id: string, @Body() data: UpdateUserDto) {
        return await this.usersService.update(+id, data);
    }

    @Delete(':id')
    remove(@Param('id') id: string) {
        return this.usersService.remove(+id);
    }

    @Get('userPosts/:id')
    async userPost(@Param('id') id: string) {
        return await this.usersService.userPosts(+id);
    }
}
