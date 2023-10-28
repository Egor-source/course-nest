import {Controller, Get, Post, Body, Param, Delete, ParseIntPipe, UseGuards} from '@nestjs/common';
import {PostsService} from './posts.service';
import {CreatePostDto} from './dto/create-post.dto';
import {RolesGuard} from "../guards/RolesGuard";
import {AuthGuard} from "@nestjs/passport";

@Controller('posts')
export class PostsController {
    constructor(private readonly postsService: PostsService) {
    }

    @UseGuards(new RolesGuard({
        roles: ['admin'],
        userId:['userId']
    }))
    @UseGuards(AuthGuard('jwt'))
    @Post()
    create(@Body() createPostDto: CreatePostDto) {
        return this.postsService.create(createPostDto);
    }

    @Get()
    findAll() {
        return this.postsService.findAll();
    }

    @Get(':id')
    findOne(@Param('id', ParseIntPipe) id: string) {
        return this.postsService.findOne(+id);
    }

    @UseGuards(AuthGuard('jwt'))
    @Delete(':id')
    remove(@Param('id') id: string) {
        return this.postsService.remove(+id);
    }
}
