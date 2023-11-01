import {Delete, Post} from '@nestjs/common';
import {AdminMethodDecorator} from "./AdminMethodDecorator";
import {MethodsTypes} from "./MethodsTypes";
import {IAdminMethod} from "../../admin/interfaces/IAdminMethod";


export function AdminDelete(data?: IAdminMethod) {
    return AdminMethodDecorator({
        requestType: Delete(data?.path),
        methodType: MethodsTypes.delete,
        path: data?.path,
        options: data?.options,
    })
}


