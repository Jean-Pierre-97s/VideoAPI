import { Module } from '@nestjs/common';
import { VideosService } from './videos.service';
import { VideosController } from './videos.controller';
import { CategoriesService } from 'src/categories/categories.service';

@Module({
  controllers: [VideosController],
  providers: [VideosService, CategoriesService],
})
export class VideosModule { }
