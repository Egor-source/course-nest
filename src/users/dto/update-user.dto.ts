import { PartialType } from '@nestjs/mapped-types';
import { CreateUserDto } from './create-user.dto';
import {Role} from "../../roles/entities/role.entity";

export class UpdateUserDto extends PartialType(CreateUserDto) {
    id: string
    roles: Role[]
}
