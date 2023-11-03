import {PartialType} from '@nestjs/mapped-types';
import {CreateUserDto} from './create-user.dto';
import {Role} from "../../roles/entities/role.entity";
import {ApiProperty, OmitType} from "@nestjs/swagger";

export class UpdateUserDto extends OmitType(CreateUserDto, ['roles'] as const) {
    @ApiProperty()
    id: string
    @ApiProperty()
    roles: Role[]
}

export class UpdateUserDtoRequest extends PartialType(CreateUserDto) {
    @ApiProperty()
    roles: number[]
}
