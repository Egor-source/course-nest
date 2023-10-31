import {Module} from '@nestjs/common';
import {AppController} from './app.controller';
import {AppService} from './app.service';
import {UsersModule} from './users/users.module';
import {PostsModule} from './posts/posts.module';
import {ConfigModule} from "@nestjs/config";
import {TypeOrmModule} from "@nestjs/typeorm";
import {User} from "./users/entities/user.entity";
import {Post} from "./posts/entities/post.entity";
import {Role} from "./roles/entities/role.entity";
import {RolesModule} from "./roles/roles.module";
import {ServeStaticModule} from "@nestjs/serve-static"
import {join} from 'path'
import { AdminModule } from './admin/admin.module';

@Module({
    imports: [
        ConfigModule.forRoot(),
        TypeOrmModule.forRoot({
            type: 'mysql',
            host: process.env.DB_HOST,
            port: +process.env.DB_PORT,
            username: process.env.DB_USER,
            password: process.env.DB_PASSWORD,
            database: process.env.DB_NAME,
            entities: [User, Post, Role],
            synchronize: true,
        }),
        ServeStaticModule.forRoot({
            rootPath: join(__dirname, '..', 'client/dist'),
            exclude: ['/api/(.*)'],
        }),
        UsersModule,
        PostsModule,
        RolesModule,
        AdminModule.register(),
    ],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule {
}
