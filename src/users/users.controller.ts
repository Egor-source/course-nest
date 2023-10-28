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
import {ValidationPipe} from "../pipes/ValidationPipe";
import {RolesGuard} from "../guards/RolesGuard";
import {UpdateUserRoleDto} from "./dto/update-user-role.dto";

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

    @UseGuards(new RolesGuard({
        roles: ['admin']
    }))
    @UseGuards(AuthGuard('jwt'))
    @Get()
    async findAll(@Request() req) {
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

    @UseGuards(new RolesGuard({
        roles: ['admin'],
        userId: 'id',
    }))
    @UseGuards(AuthGuard('jwt'))
    @Patch(':id')
    async update(@Param('id') id: string, @Body() data: UpdateUserDto) {
        return await this.usersService.update(+id, data);
    }

    @UseGuards(new RolesGuard({
        roles: ['admin'],
    }))
    @UseGuards(AuthGuard('jwt'))
    @Patch('rolesUpdate/:id')
    async updateUserRoles(@Param('id') id: string, @Body() roles: UpdateUserRoleDto[]){
        return await this.usersService.updateUserRoles(+id, roles);
    }

    @UseGuards(new RolesGuard({
        roles: ['admin'],
        userId: 'id',
    }))
    @UseGuards(AuthGuard('jwt'))
    @Delete(':id')
    remove(@Param('id') id: string) {
        return this.usersService.remove(+id);
    }

    @Get('userPosts/:id')
    async userPost(@Param('id') id: string) {
        return await this.usersService.userPosts(+id);
    }
}
