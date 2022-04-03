import { CreateTestDTO } from './dto/create-test.dto';
import { TestService } from './test.service';
import { Test } from './interfaces/test.interface';
import { PostsService } from 'src/posts/posts.service';
import { CreatePostDto } from 'src/posts/dto/createPost.dto';
export declare class TestController {
    private testService;
    private postService;
    constructor(testService: TestService, postService: PostsService);
    getTest(): string;
    getStatus(response: any): any;
    getPath(request: any): string;
    findAll(res: any): Promise<Test[]>;
    getTestId(id: any): string;
    create(createTestDTO: CreateTestDTO): any;
    createNewPost(createPostDTO: CreatePostDto): void;
}
