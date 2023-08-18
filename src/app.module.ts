import { Module } from '@nestjs/common';
import { CategoriesModule } from './categories/categories.module';
import { PrismaModule } from './prisma/prisma.module';
import { VideosModule } from './videos/videos.module';

@Module({
  imports: [CategoriesModule, PrismaModule, VideosModule],
  controllers: [],
  providers: [],
})
export class AppModule { }
