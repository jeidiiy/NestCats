import { CatRequestDto } from './dto/cats.request.dto';
import { CatsService } from './cats.service';
import { Body, Controller, Post } from '@nestjs/common';

@Controller('cats')
export class CatsController {
  constructor(private readonly catsService: CatsService) {}

  @Post()
  async signup(@Body() body: CatRequestDto) {
    return await this.catsService.signup(body);
  }
}
