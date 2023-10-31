import {Controller, Get, Post, Body, Param, Delete, ParseIntPipe, UseGuards} from '@nestjs/common';
import {PostsService} from './posts.service';
import {CreatePostDto} from './dto/create-post.dto';
import {UserGuard} from "../guards/UserGuard";
import {AuthGuard} from "@nestjs/passport";
import {Post as userPost} from "./entities/post.entity"
import {ApiBearerAuth, ApiBody, ApiTags, ApiResponse} from "@nestjs/swagger";
import {DeleteResult} from "typeorm";

@ApiTags('Posts')
@Controller('posts')
export class PostsController {
    constructor(private readonly postsService: PostsService) {
    }

    @ApiResponse({
        status: 200,
        description: 'Создание поста',
        type: userPost,
    })
    @ApiBearerAuth()
    @ApiBody({type: CreatePostDto})
    @UseGuards(new UserGuard(['userId']))
    @UseGuards(AuthGuard('jwt'))
    @Post()
    create(@Body() createPostDto: CreatePostDto): Promise<userPost> {
        return this.postsService.create(createPostDto);
    }

    @ApiResponse({
        status: 200,
        description: 'Пост по id',
        type: userPost,
    })
    @Get(':id')
    findOne(@Param('id', ParseIntPipe) id: string): Promise<userPost> {
        return this.postsService.findOne(+id);
    }

    @ApiResponse({
        status: 200,
        description: 'Удаление поста',
        type: DeleteResult,
    })
    @ApiBearerAuth()
    @UseGuards(AuthGuard('jwt'))
    @Delete(':id')
    remove(@Param('id') id: string) {
        return this.postsService.remove(+id);
    }

    @ApiResponse({
        status: 200,
        description: 'Посты пользователя',
        type:[userPost]
    })
    @Get('userPosts/:id')
    async userPost(@Param('id') id: string):Promise<userPost[]> {
        return await this.postsService.userPosts(+id);
    }
}
