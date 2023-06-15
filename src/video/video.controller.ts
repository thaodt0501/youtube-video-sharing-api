import { Controller, Get, Post, Put, Delete, Body, Param, UseGuards } from '@nestjs/common';
import { VideoService } from './video.service';
import { Video } from './video.schema';
import { AuthGuard } from '@nestjs/passport';


@Controller('video')
export class VideoController {
  constructor(private readonly videoService: VideoService) { }

  // @UseGuards(AuthGuard('local'))
  @Post()
  async create(@Body() video: Video) {
    return this.videoService.create(video);
  }

  @Get()
  async findAll(): Promise<Video[]> {
    return this.videoService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<Video> {
    return this.videoService.findOne(id);
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() task: Video): Promise<Video> {
    return this.videoService.update(id, task);
  }

  @Delete(':id')
  async delete(@Param('id') id: string): Promise<Video> {
    return this.videoService.delete(id);
  }
}
