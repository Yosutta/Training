import { Injectable } from '@nestjs/common'
import { post } from './interfaces/post.interface'

@Injectable()
export class PostsService {
  private readonly posts: post[] = []
  findAll(): post[] {
    return this.posts
  }

  create(createPostDto): void {
    createPostDto['id'] = this.posts.length
    createPostDto['authorId'] = 1
    createPostDto['published'] = 1
    createPostDto['createdAt'] = new Date(Date.now())
      .toISOString()
      .split('T')[0]
    this.posts.push(createPostDto)
  }
}
