import {Body, Param} from '@nestjs/common';
import {PostsService} from './posts.service';
import {CreatePostDto} from './dto/create-post.dto';
import {Post as userPost} from "./entities/post.entity"
import {ApiBody, ApiResponse} from "@nestjs/swagger";
import {DeleteResult} from "typeorm";
import {AdminController} from "../decorators/admin/AdminController";
import {PaginateResultDto} from "../dto/PaginateResultDto";
import {PaginateInfoDto} from "../dto/PaginateInfoDto";
import {AdminCreate} from "../decorators/admin/AdminCreate";
import {AdminPaginate} from "../decorators/admin/AdminPaginate";
import {AdminDelete} from "../decorators/admin/AdminDelete";

@AdminController('adminPosts', 'Посты', 'AdminPosts')
export class PostsAdminController {
    constructor(private readonly postsService: PostsService) {
    }

    @ApiResponse({
        status: 200,
        description: 'Создание поста',
        type: userPost,
    })
    @ApiBody({type: CreatePostDto})
    @AdminCreate()
    create(@Body() createPostDto: CreatePostDto): Promise<userPost> {
        return this.postsService.create(createPostDto);
    }

    @ApiResponse({
        status: 200,
        description: 'Список всех постов',
        type: PaginateResultDto<userPost>
    })
    @AdminPaginate('/paginate')
    async paginate(@Body() paginate: PaginateInfoDto): Promise<PaginateResultDto<userPost>> {
        return this.postsService.paginate(paginate);
    }

    @ApiResponse({
        status: 200,
        description: 'Удаление поста',
        type: DeleteResult,
    })
    @AdminDelete(':id')
    remove(@Param('id') id: string) {
        return this.postsService.remove(+id);
    }
}
