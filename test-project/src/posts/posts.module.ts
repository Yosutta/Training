import { MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common'
import CheckMiddleware from 'src/middleware/checker.middleware'
import { PostsController } from './posts.controller'
import { PostsService } from './posts.service'

@Module({
  controllers: [PostsController],
  providers: [PostsService],
  exports: [PostsService]
})
export class PostsModule implements NestModule{
  configure(consumer: MiddlewareConsumer){
    consumer
    .apply(CheckMiddleware)
    .exclude(
      {path:'posts', method: RequestMethod.POST}
    )
    .forRoutes(PostsController)
  }
}