import {Post} from '@nestjs/common';
import {AdminMethodDecorator} from "./AdminMethodDecorator";
import {MethodsTypes} from "./MethodsTypes";
import {IAdminMethod} from "../../admin/interfaces/IAdminMethod";


export function AdminLogin(data?:IAdminMethod) {
    return AdminMethodDecorator({
        requestType: Post(data?.path),
        methodType: MethodsTypes.login,
        path: data?.path,
        options: data?.options,
    })
}


