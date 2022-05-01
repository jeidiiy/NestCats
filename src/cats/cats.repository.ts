import { CatRequestDto } from './dto/cats.request.dto';
import { Model } from 'mongoose';
import { HttpException, Injectable } from '@nestjs/common';
import { Cat } from './cats.schema';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class CatsRepository {
  constructor(@InjectModel(Cat.name) private readonly catModel: Model<Cat>) {}

  async findByIdWithoutPassword(id: string): Promise<Cat | null> {
    const cat = this.catModel.findById(id).select('-password');
    return cat;
  }

  async findByEmail(email: string): Promise<Cat | null> {
    const cat = this.catModel.findOne({ email: email });
    return cat;
  }

  async existsByEmail(email: string): Promise<boolean> {
    try {
      const result = await this.catModel.exists({ email });

      return result ? true : false;
    } catch (err) {
      throw new HttpException('db error', err);
    }
  }

  async save(catRequestDto: CatRequestDto) {
    return await this.catModel.create(catRequestDto);
  }
}
