import {Post} from '@nestjs/common';
import {AdminMethodDecorator} from "./AdminMethodDecorator";
import {MethodsTypes} from "./MethodsTypes";


export function AdminLogin(path?: string) {
    return AdminMethodDecorator(Post(path), MethodsTypes.login, path)
}


