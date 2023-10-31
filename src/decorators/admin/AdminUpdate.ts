import {Patch} from '@nestjs/common';
import {AdminMethodDecorator} from "./AdminMethodDecorator";
import {MethodsTypes} from "./MethodsTypes";

export function AdminUpdate(path?: string) {
    return AdminMethodDecorator(Patch(path), MethodsTypes.update, path)

}


