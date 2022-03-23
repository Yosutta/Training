import { post } from './interfaces/post.interface';
export declare class PostsService {
    private readonly posts;
    findAll(): post[];
    create(createPostDto: any): void;
}
