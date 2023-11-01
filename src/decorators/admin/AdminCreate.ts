import {Post} from '@nestjs/common';
import {AdminMethodDecorator} from "./AdminMethodDecorator";
import {MethodsTypes} from "./MethodsTypes";
import {IAdminMethod} from "../../admin/interfaces/IAdminMethod";


export function AdminCreate(data?: IAdminMethod) {
    return AdminMethodDecorator({
        requestType: Post(data?.path),
        methodType: MethodsTypes.create,
        path: data?.path,
        options: data?.options,
    })
}


