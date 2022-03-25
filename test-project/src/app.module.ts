import { Module } from '@nestjs/common'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { TestController } from './test/test.controller'
import { TestService } from './test/test.service'
import { PostsController } from './posts/posts.controller'
import { PostsService } from './posts/posts.service'
import { PostsModule } from './posts/posts.module'
import { TestModule } from './test/test.module';

@Module({
  imports: [PostsModule, TestModule],
  controllers: [AppController],
  providers: [AppService, TestService],
})
export class AppModule {}
