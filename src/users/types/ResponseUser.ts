import {Role} from "../../roles/entities/role.entity";
import {ApiProperty} from "@nestjs/swagger";

export class ResponseUser {
    @ApiProperty()
    id: number
    @ApiProperty()
    login:string
    @ApiProperty({
        default:['user']
    })
    roles: Role[]
}