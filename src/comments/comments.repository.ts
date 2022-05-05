import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Comments } from './comments.schema';
import { Model } from 'mongoose';
import { CommentsCreateDto } from './dto/comments.create.dto';

@Injectable()
export class CommentsRepository {
  constructor(
    @InjectModel(Comments.name) private readonly commentsModel: Model<Comments>,
  ) {}

  create(commentsCreateDto: CommentsCreateDto) {
    return new this.commentsModel(commentsCreateDto);
  }

  async findById(id: string) {
    const comment = await this.commentsModel.findById(id);
    return comment;
  }

  async findAll() {
    const comments = await this.commentsModel.find();
    return comments;
  }
}
