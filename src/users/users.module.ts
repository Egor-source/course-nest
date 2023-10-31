import {Module} from '@nestjs/common';
import {UsersService} from './users.service';
import {UsersController} from './users.controller';
import {TypeOrmModule} from "@nestjs/typeorm";
import {User} from "./entities/user.entity";
import {AuthModule} from "../auth/auth.module";
import {JwtModule} from "@nestjs/jwt";
import {RolesModule} from "../roles/roles.module";
import {UsersAdminController} from "./user.admin.controller";

@Module({
    imports: [
        TypeOrmModule.forFeature([User]),
        JwtModule,
        AuthModule,
        RolesModule,
    ],
    controllers: [UsersController, UsersAdminController],
    providers: [UsersService],
    exports: [UsersService],
})
export class UsersModule {
}
