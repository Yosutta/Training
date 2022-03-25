import { Module } from '@nestjs/common';
import { PostsModule } from 'src/posts/posts.module';
import { TestController } from './test.controller';
import { TestService } from './test.service';

@Module({
    imports: [PostsModule],
    controllers: [TestController],
    providers: [TestService]
})
export class TestModule {}
