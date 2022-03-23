import {
  Body,
  Controller,
  Get,
  HttpCode,
  Param,
  Post,
  Req,
  Res,
} from '@nestjs/common';
import { StatusCodes } from 'http-status-codes';
import { CreateTestDTO } from './dto/create-test.dto';
import { TestService } from './test.service';
import { Test } from './interfaces/test.interface';

@Controller('test')
export class TestController {
  // Notice the use of the private syntax below.
  // This shorthand allows us to both declare and initialize the catsService member immediately in the same location.
  constructor(private testService: TestService) {}

  @Get()
  getTest(): string {
    return 'This is a test';
  }

  @Get('status')
  getStatus(@Res() response): any {
    response.status(300).send('This is a mistake');
  }

  //In order to take advantage of express typings (as in the request: Request parameter example above), install @types/express package
  @Get('path')
  @HttpCode(StatusCodes.OK)
  getPath(@Req() request): string {
    return request.originalUrl;
  }

  @Get('findAll')
  async findAll(@Res() res): Promise<Test[]> {
    res
      .status(StatusCodes.OK)
      .send({ message: StatusCodes.OK, data: this.testService.findAll() });
    return this.testService.findAll();
  }

  @Get(':id')
  getId(@Param('id') id: string) {
    return `Param id ${id}`;
  }

  @Post()
  create(@Body() createTestDTO: CreateTestDTO): any {
    this.testService.create(createTestDTO);
  }
}
