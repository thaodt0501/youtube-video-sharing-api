import { Controller, Get, Post, Put, Delete, Body, Param, UseGuards, Request } from '@nestjs/common';
import { VideoService } from './video.service';
import { Video } from './video.schema';
import { AuthGuard } from '../auth/auth.guard';


@Controller('video')
export class VideoController {
  constructor(private readonly videoService: VideoService) { }

  @UseGuards(AuthGuard)
  @Post()
  async create(@Body() video: Video, @Request() req) {
    // console.log(req)
    const videoCreated = await this.videoService.create({ ...video, sharedBy: req.user.email });
    return {
      video: videoCreated
    }
  }

  @Get()
  async findAll() {
    const articles = await this.videoService.findAll();
    return {
      articles: articles,
      articlesCount: 0
    };
  }

  @UseGuards(AuthGuard)
  @Get('feed')
  async findByUser(@Request() req) {
    const articles = await this.videoService.findByUser(req.user);
    return {
      articles: articles,
      articlesCount: 0
    };
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
