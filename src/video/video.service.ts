import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Video, VideoDocument } from './video.schema';
import { Model } from 'mongoose';



@Injectable()
export class VideoService {
  constructor(@InjectModel(Video.name) private videoModel: Model<VideoDocument>) { }

  async create(createVideoDto: { title: string, description: string, link: string }): Promise<Video> {
    const createdTask = new this.videoModel(createVideoDto);
    return createdTask.save();
  }

  async findAll(): Promise<Video[]> {
    return this.videoModel.find().exec();
  }

  async findOne(id: string): Promise<Video> {
    return this.videoModel.findById(id);
  }

  async update(id: string, task: any): Promise<Video> {
    return this.videoModel.findByIdAndUpdate(id, task, { new: true });
  }

  async delete(id: string): Promise<Video> {
    return this.videoModel.findByIdAndRemove(id);
  }
}
