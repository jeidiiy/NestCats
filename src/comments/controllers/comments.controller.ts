import { Body, Controller, Get, Param, Patch, Post } from '@nestjs/common';
import { ApiOperation } from '@nestjs/swagger';
import { CommentsService } from '../services/comments.service';
import { CommentsRequestDto } from '../dto/comments.request.dto';

@Controller('comments')
export class CommentsController {
  constructor(private readonly commentsService: CommentsService) {}

  @ApiOperation({ summary: '모든 고양이 프로필에 적힌 댓글 가져오기' })
  @Get()
  async getAllComments() {
    return this.commentsService.getAllComments();
  }

  @ApiOperation({ summary: '특정 고양이 프로필에 댓글 작성하기' })
  @Post(':id')
  async createComment(
    @Param('id') id: string,
    @Body() body: CommentsRequestDto,
  ) {
    return this.commentsService.createComment(id, body);
  }

  @ApiOperation({ summary: '좋아요 수 늘리기' })
  @Patch(':id')
  async plusLike(@Param('id') id: string) {
    return this.commentsService.plusLike(id);
  }
}
