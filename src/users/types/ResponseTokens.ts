import {ApiProperty} from "@nestjs/swagger";

export class ResponseTokens{
    @ApiProperty()
    access_token:string
    @ApiProperty()
    refresh_token: string
}