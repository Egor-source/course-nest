import {Injectable} from '@nestjs/common';
import {UsersService} from '../users/users.service';
import {JwtService} from '@nestjs/jwt';
import * as bcrypt from "bcrypt";
import {UpdateUserDto} from "../users/dto/update-user.dto";


@Injectable()
export class AuthService {
    constructor(
        private usersService: UsersService,
        private jwtService: JwtService
    ) {
    }

    async validateUser(login: string, password: string): Promise<any> {
        const user = await this.usersService.findOne(login);
        if (user && await bcrypt.compare(password, user.password)) {
            const {password, ...result} = user;
            return result;
        }
        return null;
    }

    async login(user: UpdateUserDto) {
        const payload = {login: user.login, id: user.id, roles: JSON.stringify(user.roles)};
        console.log(payload)
        return {
            access_token: this.jwtService.sign(payload, {
                secret: process.env.JWT_SECRET,
                expiresIn: '1d',
            }),
            refresh_token: this.jwtService.sign(payload, {
                secret: process.env.JWT_REFRESH_SECRET,
                expiresIn: '30d',
            }),
        };
    }
}