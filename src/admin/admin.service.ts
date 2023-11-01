import {Injectable, Inject, Type} from '@nestjs/common';
import * as fs from 'fs'
import * as path from "path";
import {Reflector, ModuleRef} from "@nestjs/core";
import {IMethods} from "./interfaces/IMethods";

@Injectable()
export class AdminService {
    constructor(
        @Inject(Reflector) private reflector: Reflector,
        @Inject(ModuleRef) private moduleRef: ModuleRef,
    ) {
    }

    async getAdminControllersPaths() {
        const paths = this.findAdminControllerFiles();

        return await Promise.all(paths.map(async (path) => {
            const data = await import(path);
            const controller = Object.values(data)[0] as Type;
            const controllerRef = this.moduleRef.get(controller, {strict: false});
            const prefix = this.reflector.get('controllerPrefix', controller);
            const label = this.reflector.get('controllerLabel', controller);
            const options = this.reflector.get('options', controller);
            return {
                name: prefix.replace('admin', '').toLowerCase(),
                label,
                methods: {
                    ...this.getMethods(controllerRef, prefix)
                },
                options,
            }
        }))
    }

    private findAdminControllerFiles(directory: string = path.join(__dirname, '..')) {
        const files = fs.readdirSync(directory);
        const adminControllerFiles = [];

        files.forEach((file) => {
            const filePath = path.join(directory, file);
            const stat = fs.statSync(filePath);

            if (stat.isDirectory()) {
                adminControllerFiles.push(...this.findAdminControllerFiles(filePath));
            } else {
                if (file.includes('.admin.controller.js') && !file.includes('.map')) {
                    adminControllerFiles.push(filePath);
                }
            }
        });

        return adminControllerFiles;
    }

    private getMethods(controllerRef: Type, prefix: string) {
        return Object.getOwnPropertyNames(Object.getPrototypeOf(controllerRef))
            .reduce((acc, name) => {
                if (name !== 'constructor') {
                    const methodType = this.reflector.get('methodType', controllerRef[name])
                    const path = this.reflector.get('path', controllerRef[name])?.replace('/', '')
                    const options = this.reflector.get('options', controllerRef[name])
                    if (methodType) {
                        acc[methodType] = {
                            path: `${process.env.GLOBAL_PREFIX}/${prefix}/${path ?? ''}`,
                            options,
                        }
                    }
                }
                return acc
            }, {
                create: null,
                update: null,
                delete: null,
                paginate: null,
                login: null,
            } as IMethods)
    }
}
