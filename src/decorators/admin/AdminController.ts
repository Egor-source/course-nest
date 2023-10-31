import {applyDecorators, Controller, SetMetadata, UseGuards} from '@nestjs/common';
import {RolesGuard} from "../../guards/RolesGuard";
import {AuthGuard} from "@nestjs/passport";
import {ApiBearerAuth, ApiTags} from "@nestjs/swagger";

export function AdminController(prefix:string, controllerLabel:string ,...tags: string[]) {
    return applyDecorators(
        Controller(prefix),
        ApiTags(...tags),
        ApiBearerAuth(),
        UseGuards(AuthGuard('jwt')),
        UseGuards(new RolesGuard(['admin'])),
        SetMetadata('controllerLabel', controllerLabel),
        SetMetadata('controllerPrefix', prefix)
    );
}