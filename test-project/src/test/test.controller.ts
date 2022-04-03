import {
  Body,
  Controller,
  DefaultValuePipe,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  ParseIntPipe,
  Post,
  Req,
  Res,
} from '@nestjs/common'
import { StatusCodes } from 'http-status-codes'
import { CreateTestDTO } from './dto/create-test.dto'
import { TestService } from './test.service'
import { Test } from './interfaces/test.interface'
import { PostsService } from 'src/posts/posts.service'
import { CreatePostDto } from 'src/posts/dto/createPost.dto'

@Controller('test')
export class TestController {
  // Notice the use of the private syntax below.
  // This shorthand allows us to both declare and initialize the catsService member immediately in the same location.
  constructor(private testService: TestService,private postService: PostsService) {}

  @Get()
  getTest(): string {
    return 'This is a test'
  }

  @Get('status')
  getStatus(@Res() response): any {
    response.status(300).send('This is a mistake')
  }

  //In order to take advantage of express typings (as in the request: Request parameter example above), install @types/express package
  @Get('path')
  @HttpCode(StatusCodes.OK)
  getPath(@Req() request): string {
    return request.originalUrl
  }

  @Get('findAll')
  async findAll(@Res() res): Promise<Test[]> {
    res
      .status(StatusCodes.OK)
      .send({ message: StatusCodes.OK, data: this.testService.findAll() })
    return this.testService.findAll()
  }

  @Get('anid')
  getTestId(@Param('id', new DefaultValuePipe(69), ParseIntPipe) id){
    return `Param id is ${id}`
  }

  // @Get(':id')
  // getId(@Param('id', new DefaultValuePipe(69),new ParseIntPipe({ errorHttpStatusCode: HttpStatus.NOT_ACCEPTABLE })) id: number) {
  //   return `Param id ${id}`
  // }

  @Post()
  create(@Body() createTestDTO: CreateTestDTO): any {
    this.testService.create(createTestDTO)
  }

  @Post('createPost')
  createNewPost(@Body() createPostDTO:CreatePostDto){
    this.postService.create(createPostDTO)
  }

}
