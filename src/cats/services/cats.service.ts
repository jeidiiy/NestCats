import { LoginRequestDto } from '../../auth/dto/login.request.dto';
import { CatsRepository } from '../cats.repository';
import { Body, Injectable, UnauthorizedException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { CatRequestDto } from '../dto/cats.request.dto';
import { AuthService } from 'src/auth/auth.service';
import { Cat } from '../cats.schema';

@Injectable()
export class CatsService {
  constructor(
    private readonly catsRepository: CatsRepository,
    private readonly authService: AuthService,
  ) {}

  async getAllCat() {
    const allCat = await this.catsRepository.findAll();
    const readOnlyCats = allCat.map((cat) => cat.readOnlyData);
    return readOnlyCats;
  }

  async uploadImg(cat: Cat, files: Express.Multer.File[]) {
    const filename = files[0].filename;

    console.log(filename);
    const newCat = await this.catsRepository.findByIdAndUpdateImg(
      cat.id,
      filename,
    );
    console.log(newCat);
    return newCat;
  }

  async signup(body: CatRequestDto) {
    const { email, name, password } = body;
    const isCatExist = await this.catsRepository.existsByEmail(email);

    if (isCatExist) {
      throw new UnauthorizedException('해당하는 고양이는 이미 존재합니다.');
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const cat = await this.catsRepository.save({
      email,
      name,
      password: hashedPassword,
    });

    return cat.readOnlyData;
  }

  login(@Body() data: LoginRequestDto) {
    this.authService.jwtLogin(data);
  }
}
