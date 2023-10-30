import {ApiProperty} from "@nestjs/swagger";

export class CreatePostDto {
    @ApiProperty()
    userId: number
    @ApiProperty()
    title: string
    @ApiProperty()
    text: string
}
