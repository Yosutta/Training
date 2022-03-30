import { CreatePostDto } from './dto/createPost.dto';
import { PostsService } from './posts.service';
export declare class PostsController {
    private postsService;
    constructor(postsService: PostsService);
    findAll(res: any): Promise<any>;
    create(createPostDto: CreatePostDto, res: any): void;
    throwError(): void;
}
