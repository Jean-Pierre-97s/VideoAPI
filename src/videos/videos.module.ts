import { Module } from '@nestjs/common';
import { VideosService } from './videos.service';
import { VideosController } from './videos.controller';
import { CategoriesService } from 'src/categories/categories.service';
import { MulterModule } from '@nestjs/platform-express';
import * as multer from 'multer';

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/')
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname)
  }
})

@Module({
  controllers: [VideosController],
  providers: [VideosService, CategoriesService],
  imports: [MulterModule.register({
    storage
  })]
})
export class VideosModule { }
