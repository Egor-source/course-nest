import {ApiProperty} from "@nestjs/swagger";
import {Role} from "../../roles/entities/role.entity";

export class LoginDto {
    @ApiProperty()
    id: string
    @ApiProperty()
    login: string
    @ApiProperty({
        default: ['user']
    })
    roles: Role[]
    @ApiProperty()
    access_token: string
    @ApiProperty()
    refresh_token: string
}