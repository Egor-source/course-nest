import {AdminService} from './admin.service';
import {AdminController} from './admin.controller';
import { DynamicModule, Module } from '@nestjs/common';

@Module({})
export class AdminModule {
    static register(): DynamicModule {
        return {
            module: AdminModule,
            controllers: [AdminController],
            providers: [AdminService],
        };
    }
}
