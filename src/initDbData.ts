import {NestFactory} from "@nestjs/core";
import {AppModule} from "./app.module";
import {RolesService} from "./roles/roles.service";
import {UsersService} from "./users/users.service";

async function bootstrap() {
    const app = await NestFactory.createApplicationContext(AppModule);
    const rolesService = app.get(RolesService);
    const userService = app.get(UsersService);
    const adminRole =  await rolesService.create({name: 'admin'});
    await rolesService.create({name: 'user'});
    await userService.create({login: 'admin', password: 'admin', roles: [adminRole.id]})
    await app.close();
}

bootstrap();
