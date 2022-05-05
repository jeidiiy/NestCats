import { BadRequestException, Injectable } from '@nestjs/common';
import { CommentsRequestDto } from '../dto/comments.request.dto';
import { CatsRepository } from 'src/cats/cats.repository';
import { CommentsRepository } from '../comments.repository';

@Injectable()
export class CommentsService {
  constructor(
    private readonly commentsRepository: CommentsRepository,
    private readonly catsRepository: CatsRepository,
  ) {}
  async plusLike(id: string) {
    try {
      const comments = await this.commentsRepository.findById(id);
      comments.likeCount += 1;
      return await comments.save();
    } catch (error) {}
  }

  async createComment(id: string, commentData: CommentsRequestDto) {
    try {
      const targetCat = await this.catsRepository.findByIdWithoutPassword(id);
      const { author, contents } = commentData;
      const validatedAuthor = await this.catsRepository.findByIdWithoutPassword(
        author,
      );
      const newComments = this.commentsRepository.create({
        author: validatedAuthor._id,
        contents,
        info: targetCat._id,
      });
      return await newComments.save();
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async getAllComments() {
    try {
      const comments = await this.commentsRepository.findAll();
      return comments;
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }
}
