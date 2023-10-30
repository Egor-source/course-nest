import {ApiProperty} from "@nestjs/swagger";

export  class UpdateUserRoleDto{
    @ApiProperty()
    name: string
}