import {Injectable} from '@nestjs/common';
import {CreatePostDto} from './dto/create-post.dto';
import {InjectRepository} from "@nestjs/typeorm";
import {Repository} from "typeorm";
import {Post} from "./entities/post.entity";
import {User} from "../users/entities/user.entity";

@Injectable()
export class PostsService {
    constructor(
        @InjectRepository(Post)
        private repository: Repository<Post>,
        @InjectRepository(User)
        private userRepository: Repository<User>
    ) {
    }

    async create(postData: CreatePostDto) {
        const user = await this.userRepository.findOneBy({id: postData.userId})
        const newPost = await this.repository.save({
            ...postData,
            user,
        });
        delete newPost.user.password;
        return newPost
    }

    async findAll() {
        const posts = await this.repository.find();
        return posts.map((post) => {
            delete post.user.password
            return post
        })
    }

    async findOne(id: number) {
        const post = await this.repository.findOneBy({id});
        delete post.user.password;
        return post;
    }

    async remove(id: number) {
        return await this.repository.delete(id);
    }

    async userPosts(userId: number) {
        const posts = await this.repository.findBy({userId})
        return posts.map((post) => {
            delete post.user.password
            return post
        })
    }
}
