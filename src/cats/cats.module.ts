import { CatsService } from './services/cats.service';
import { CatsController } from './controllers/cats.controller';
import { Cat, CatSchema } from './cats.schema';
import { MongooseModule } from '@nestjs/mongoose';
import { forwardRef, Module } from '@nestjs/common';
import { CatsRepository } from './cats.repository';
import { AuthModule } from 'src/auth/auth.module';
import { MulterModule } from '@nestjs/platform-express';
import { Comments, CommentsSchema } from 'src/comments/comments.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Comments.name, schema: CommentsSchema },
      { name: Cat.name, schema: CatSchema },
    ]),
    forwardRef(() => AuthModule),
    MulterModule.register({
      dest: '/upload',
    }),
  ],
  controllers: [CatsController],
  providers: [CatsService, CatsRepository],
  exports: [CatsService, CatsRepository],
})
export class CatsModule {}
