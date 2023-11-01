import {Patch} from '@nestjs/common';
import {AdminMethodDecorator} from "./AdminMethodDecorator";
import {MethodsTypes} from "./MethodsTypes";
import {IAdminMethod} from "../../admin/interfaces/IAdminMethod";

export function AdminUpdate(data?: IAdminMethod) {
    return AdminMethodDecorator({
        requestType: Patch(data?.path),
        methodType: MethodsTypes.update,
        path: data?.path,
        options: data?.options,
    })
}


