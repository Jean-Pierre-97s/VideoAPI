import { Controller, Get, Post, Body, Patch, Param, Delete, UploadedFile, ParseFilePipe, UseInterceptors, Res, HttpCode } from '@nestjs/common';
import { VideosService } from './videos.service';
import { CreateVideoDto, CreateVideoWithUploadDto } from './dto/create-video.dto';
import { UpdateVideoDto } from './dto/update-video.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { VideoFileValidator } from './video-file-validator';
import { createReadStream } from 'fs';
import { join } from 'path';
import { Response } from 'express';
import { VideoSerializer } from './video-serializer';
import { ApiBody, ApiConsumes, ApiTags } from '@nestjs/swagger';

@Controller('videos')
export class VideosController {
  constructor(private readonly videosService: VideosService) { }

  @ApiTags('Videos')
  @ApiBody({
    type: CreateVideoWithUploadDto,
  })
  @ApiConsumes('multipart/form-data')
  @UseInterceptors(FileInterceptor('file'))
  @Post()
  create(
    @Body() createVideoDto: CreateVideoDto,
    @UploadedFile(
      new ParseFilePipe({
        validators: [
          new VideoFileValidator({
            maxSize: 1024 * 1024 * 100,
            mimetype: 'video/mp4',
          }),
        ],
        errorHttpStatusCode: 422,
      }),
    )
    file: Express.Multer.File,
  ) {
    return this.videosService.create({
      ...createVideoDto,
      file,
    }
    );
  }

  @ApiTags('Videos')
  @Get()
  async findAll() {
    const videos = await this.videosService.findAll();
    return videos.map((video) => new VideoSerializer(video))
  }

  @ApiTags('Videos')
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.videosService.findOne(+id);
  }

  @ApiTags('Videos')
  @Get('file/:file')
  file(@Param('file') file: string, @Res() res: Response) {
    const fileStream = createReadStream(join(process.cwd(), 'uploads', file));
    fileStream.pipe(res);
  }

  @ApiTags('Videos')
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateVideoDto: UpdateVideoDto) {
    return this.videosService.update(+id, updateVideoDto);
  }

  @ApiTags('Videos')
  @HttpCode(204)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.videosService.remove(+id);
  }
}
