import {ResponseUser} from "./ResponseUser";
import {ApiProperty} from "@nestjs/swagger";

export class ResponseUserFull extends ResponseUser{
    @ApiProperty()
    password: string
}