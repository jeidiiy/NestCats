import { AuthService } from 'src/auth/auth.service';
import { CatRequestDto } from './dto/cats.request.dto';
import { CatsService } from './cats.service';
import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { ReadOnlyCatDto } from './dto/cats.dto';
import { JwtAuthGuard } from 'src/auth/jwt/jwt.guard';
import { Request } from 'express';
import { LoginRequestDto } from 'src/auth/dto/login.request.dto';
import { CurrentUser } from 'src/common/decorators/user.decorator';
import { Cat } from './cats.schema';

@Controller('cats')
export class CatsController {
  constructor(
    private readonly catsService: CatsService,
    private readonly authService: AuthService,
  ) {}

  @ApiOperation({ summary: '현재 고양이 가져오기' })
  @UseGuards(JwtAuthGuard)
  @Get()
  getCurrentCat(@CurrentUser() cat: Cat) {
    return cat.readOnlyData;
  }

  @ApiOperation({ summary: '로그인' })
  @Post('login')
  login(@Body() data: LoginRequestDto) {
    return this.authService.jwtLogin(data);
  }

  @ApiResponse({
    status: 500,
    description: 'Server Error!!',
  })
  @ApiResponse({
    status: 200,
    description: 'OK!!',
    type: ReadOnlyCatDto,
  })
  @ApiOperation({ summary: '회원가입' })
  @Post()
  async signup(@Body() body: CatRequestDto) {
    return await this.catsService.signup(body);
  }
}
