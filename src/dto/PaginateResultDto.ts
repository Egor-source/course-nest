import {ApiProperty} from "@nestjs/swagger";

export class PaginateResultDto<T>{
    @ApiProperty({
        description:'Возвращаемые данные'
    })
    data:T[]
    @ApiProperty({
        description:'Общее количество элементов',
        example: 10
    })
    total: number
    @ApiProperty({
        description:'Текущая страница',
        example: 1
    })
    currentPage: number
}