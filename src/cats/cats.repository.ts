import { CatRequestDto } from './dto/cats.request.dto';
import { Model } from 'mongoose';
import { HttpException, Injectable } from '@nestjs/common';
import { Cat } from './cats.schema';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class CatsRepository {
  constructor(@InjectModel(Cat.name) private readonly catModel: Model<Cat>) {}

  async findAll() {
    return await this.catModel.find();
  }

  async findByIdAndUpdateImg(id: string, filename: string) {
    const cat = await this.catModel.findById(id);

    cat.imgUrl = `http://localhost:8000/media/${filename}`;

    const newCat = await cat.save();

    console.log(newCat);
    return newCat.readOnlyData;
  }

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
