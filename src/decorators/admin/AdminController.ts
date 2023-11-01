import {applyDecorators, Controller, SetMetadata, UseGuards} from '@nestjs/common';
import {RolesGuard} from "../../guards/RolesGuard";
import {AuthGuard} from "@nestjs/passport";
import {ApiBearerAuth, ApiTags} from "@nestjs/swagger";
import {IAdminControllerDecorator} from "../../admin/interfaces/IAdminControllerDecorator";

export function AdminController(data: IAdminControllerDecorator, ...tags: string[]) {
    return applyDecorators(
        Controller(data.prefix),
        ApiTags(...tags),
        ApiBearerAuth(),
        UseGuards(AuthGuard('jwt')),
        UseGuards(new RolesGuard(['admin'])),
        SetMetadata('controllerLabel', data.controllerLabel),
        SetMetadata('controllerPrefix', data.prefix),
        SetMetadata('options', data.options),
    );
}