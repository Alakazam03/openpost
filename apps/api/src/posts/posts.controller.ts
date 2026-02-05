import { Body, Controller, Delete, Get, Headers, Param, Patch, Post } from '@nestjs/common';
import { PostsService } from './posts.service';
import { CreatePostDto, UpdatePostDto } from './posts.dto';

@Controller('posts')
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  @Post()
  createPost(@Headers('x-user-id') userId: string, @Body() dto: CreatePostDto) {
    return this.postsService.createPost(userId, dto);
  }

  @Get('scheduled')
  listScheduled(@Headers('x-user-id') userId: string) {
    return this.postsService.listScheduled(userId);
  }

  @Patch(':id')
  updatePost(
    @Headers('x-user-id') userId: string,
    @Param('id') postId: string,
    @Body() dto: UpdatePostDto
  ) {
    return this.postsService.updatePost(userId, postId, dto);
  }

  @Delete(':id')
  deletePost(@Headers('x-user-id') userId: string, @Param('id') postId: string) {
    return this.postsService.deletePost(userId, postId);
  }
}
