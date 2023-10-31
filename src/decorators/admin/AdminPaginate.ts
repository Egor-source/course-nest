import {Get} from '@nestjs/common';
import {AdminMethodDecorator} from "./AdminMethodDecorator";
import {MethodsTypes} from "./MethodsTypes";

export function AdminPaginate(path?: string) {
    return AdminMethodDecorator(Get(path), MethodsTypes.paginate, path)
}


