import {Post} from '@nestjs/common';
import {AdminMethodDecorator} from "./AdminMethodDecorator";
import {MethodsTypes} from "./MethodsTypes";


export function AdminCreate(path?: string) {
    return AdminMethodDecorator(Post(path), MethodsTypes.create, path)
}


