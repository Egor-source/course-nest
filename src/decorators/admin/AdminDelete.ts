import {Delete} from '@nestjs/common';
import {AdminMethodDecorator} from "./AdminMethodDecorator";
import {MethodsTypes} from "./MethodsTypes";


export function AdminDelete(path?: string) {
    return AdminMethodDecorator(Delete(path), MethodsTypes.delete, path)
}


