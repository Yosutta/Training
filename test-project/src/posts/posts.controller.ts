import { BadRequestException, Body, Controller, Get, HttpException, HttpStatus, InternalServerErrorException, Post, Res, UseFilters } from '@nestjs/common'
import { ReasonPhrases, StatusCodes } from 'http-status-codes'
import HttpExceptionFilter from 'src/common/filters/http-exception.filter'
import UselessException from 'src/exception/useless.exception'
import { CreatePostDto } from './dto/createPost.dto'
import { post } from './interfaces/post.interface'
import { PostsService } from './posts.service'

@Controller('posts')
export class PostsController {
  constructor(private postsService: PostsService) {}

  @Get()
  async findAll(@Res() res): Promise<any> {
    return res
      .status(StatusCodes.OK)
      .json({ message: ReasonPhrases.OK, data: this.postsService.findAll() })
  }

  @Post()
  create(@Body() createPostDto: CreatePostDto, @Res() res): void {
    this.postsService.create(createPostDto)
    return res.status(StatusCodes.OK).json({ message: ReasonPhrases.OK })
  }

  @Get('error')
  throwError(){
    throw new UselessException();
  }
}
