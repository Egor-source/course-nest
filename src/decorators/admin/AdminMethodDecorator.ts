import {applyDecorators, Get, SetMetadata} from '@nestjs/common';


export function AdminMethodDecorator(requestType: MethodDecorator, methodType: string, path?: string) {
    return applyDecorators(
        requestType,
        SetMetadata('path', path),
        SetMetadata('methodType', methodType)
    );
}


