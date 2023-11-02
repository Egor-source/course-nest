import {Post} from '@nestjs/common';
import {AdminMethodDecorator} from "./AdminMethodDecorator";
import {MethodsTypes} from "./MethodsTypes";
import {IAdminMethod} from "../../admin/interfaces/IAdminMethod";

export function AdminPaginate(data?: IAdminMethod) {
    return AdminMethodDecorator({
        requestType: Post(data?.path),
        methodType: MethodsTypes.paginate,
        path: data?.path,
        options: data?.options,
    })
}


