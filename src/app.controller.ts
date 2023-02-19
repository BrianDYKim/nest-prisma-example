import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Query,
} from '@nestjs/common';
import { AppService } from './app.service';
import { Prisma } from '@prisma/client';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Post('user')
  async createUser(@Body() payload: Prisma.UserCreateInput) {
    return await this.appService.createUser(payload);
  }

  @Post('/many')
  async createManyUser(@Body() body) {
    return await this.appService.createManyUsers();
  }

  @Post('/post')
  async createPost(@Body() payload: Prisma.PostUncheckedCreateInput) {
    return await this.appService.createPost(payload);
  }

  @Get('/users/user')
  async getOneUserWithPost(@Query('id', ParseIntPipe) userId: number) {
    return await this.appService.getUserWithPost(userId);
  }

  @Delete('/users')
  async deleteUser(@Query('id', ParseIntPipe) userId: number) {
    return await this.appService.deleteUser(userId);
  }
}
