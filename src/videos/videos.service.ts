import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateVideoDto } from './dto/create-video.dto';
import { UpdateVideoDto } from './dto/update-video.dto';
import { PrismaService } from 'src/prisma/prisma/prisma.service';
import { CategoriesService } from 'src/categories/categories.service';

@Injectable()
export class VideosService {

  constructor(private prismaService: PrismaService, private categoryService: CategoriesService) { }

  async create(createVideoDto: CreateVideoDto & { file: Express.Multer.File }) {
    await this.categoryService.findOne(createVideoDto.category_id)
    return this.prismaService.video.create({
      data: {
        title: createVideoDto.title,
        description: createVideoDto.description,
        category_id: createVideoDto.category_id,
        file_path: createVideoDto.file.path
      }
    })
  }

  findAll() {
    return this.prismaService.video.findMany({ include: { category: true } })
  }

  findOne(id: number) {
    return this.prismaService.video.findUniqueOrThrow({ where: { id }, include: { category: true } })
  }

  update(id: number, updateVideoDto: UpdateVideoDto) {
    return this.prismaService.video.update({ where: { id }, data: updateVideoDto })
  }

  remove(id: number) {
    return this.prismaService.video.delete({ where: { id } });
  }
}
