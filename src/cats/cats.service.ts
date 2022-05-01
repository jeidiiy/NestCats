import { LoginRequestDto } from './../auth/dto/login.request.dto';
import { CatsRepository } from './cats.repository';
import { Body, Injectable, UnauthorizedException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { CatRequestDto } from './dto/cats.request.dto';
import { AuthService } from 'src/auth/auth.service';

@Injectable()
export class CatsService {
  constructor(
    private readonly catsRepository: CatsRepository,
    private readonly authService: AuthService,
  ) {}

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
