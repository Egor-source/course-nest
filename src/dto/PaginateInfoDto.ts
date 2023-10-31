import {ApiProperty} from "@nestjs/swagger";

export class PaginateInfoDto{
    @ApiProperty({
        default:0,
        description:'Текущая страница',
    })
    perPage: number

    @ApiProperty({
        default:10,
        description:'Количество элементов',
    })
    count: number
}