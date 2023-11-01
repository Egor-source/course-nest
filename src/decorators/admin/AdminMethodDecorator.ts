import {applyDecorators, SetMetadata} from '@nestjs/common';
import {IAdminMethodDecorator} from "../../admin/interfaces/IAdminMethodDecorator";


export function AdminMethodDecorator(data: IAdminMethodDecorator) {
    return applyDecorators(
        data.requestType,
        SetMetadata('path', data.path),
        SetMetadata('methodType', data.methodType),
        SetMetadata('options', data.options)
    );
}


