import { Injectable } from '@nestjs/common';
import { PrismaService } from './prisma/prisma.service';
import { faker } from '@faker-js/faker';
import { Post, Prisma, User, UserInfo } from '@prisma/client';

@Injectable()
export class AppService {
  constructor(private readonly prisma: PrismaService) {
  }

  getHello(): string {
    return 'Hello World!';
  }

  async createUser(payload: Prisma.UserCreateInput) {
    const newUser: User = await this.prisma.user.create({
      data: {
        name: payload.name,
        email: faker.datatype.uuid(),
        profile: payload.profile,
        userInfo: {
          create: {
            height: '174',
            weight: 74,
            address: faker.address.city(),
          },
        },
      },
      include: {
        userInfo: true,
      },
    });

    return newUser;
  }

  async createManyUsers() {
    const data = new Array(1000000).fill({}).map((_) => ({
      name: faker.name.firstName(),
      email: faker.datatype.uuid(),
      profile: faker.lorem.sentences(),
    }));

    const newUserList = await this.prisma.user.createMany({
      data,
    });

    return newUserList;
  }

  async createPost(payload: Prisma.PostUncheckedCreateInput) {
    const newPost: Post = await this.prisma.post.create({
      data: {
        content: faker.lorem.paragraph(),
        writerId: Math.round(Math.random() * 50000) + 30000,
      },
      include: {
        author: true,
      },
    });

    return newPost;
  }

  async getUserWithPost(userId: number) {
    return this.prisma.user.findUnique({
      where: {
        userId,
      },
      include: {
        posts: true,
      },
    });
  }

  async deleteUser(userId: number): Promise<User> {
    const deletedUser: User = await this.prisma.user.delete({
      where: {
        userId,
      },
      include: {
        posts: true,
      },
    });

    return deletedUser;
  }
}
