import { Body, Controller, Get, Post, Res } from '@nestjs/common';
import { ReasonPhrases, StatusCodes } from 'http-status-codes';
import { CreatePostDto } from './dto/createPost.dto';
import { post } from './interfaces/post.interface';
import { PostsService } from './posts.service';

@Controller('posts')
export class PostsController {
  constructor(private postsService: PostsService) {}

  @Get()
  async findAll(@Res() res): Promise<any> {
    return res
      .status(StatusCodes.OK)
      .json({ message: ReasonPhrases.OK, data: this.postsService.findAll() });
  }

  @Post()
  create(@Body() createPostDto: CreatePostDto, @Res() res): void {
    this.postsService.create(createPostDto);
    return res.status(StatusCodes.OK).json({ message: ReasonPhrases.OK });
  }
}
