import {Module} from '@nestjs/common';
import {AuthService} from './auth.service';
import {UsersModule} from '../users/users.module';
import {LocalStrategy} from "./local.strategy";
import {JwtModule} from '@nestjs/jwt';
import {forwardRef} from "@nestjs/common";
import {JwtStrategy} from "./jwt.strategy";


@Module({
    imports: [
        forwardRef(() => UsersModule),
        JwtModule,
    ],
    providers: [AuthService, LocalStrategy, JwtStrategy],
    exports: [AuthService],
})
export class AuthModule {
}
