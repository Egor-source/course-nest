import {PartialType} from '@nestjs/mapped-types';
import {CreateUserDto} from './create-user.dto';
import {Role} from "../../roles/entities/role.entity";
import {ApiProperty} from "@nestjs/swagger";

export class UpdateUserDto extends PartialType(CreateUserDto) {
    @ApiProperty()
    id: string
    @ApiProperty()
    roles: Role[]
}

export class UpdateUserDtoRequest extends PartialType(CreateUserDto) {
    @ApiProperty()
    roles: number[]
}
