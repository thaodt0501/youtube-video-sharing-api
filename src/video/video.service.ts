import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Video, VideoDocument } from './video.schema';
import { Model } from 'mongoose';
import { EventsGateway } from '../events/events.gateway';

@Injectable()
export class VideoService {
  constructor(
    private readonly eventsGateway: EventsGateway,
    @InjectModel(Video.name) private videoModel: Model<VideoDocument>
  ) { }

  async create(createVideoDto: { title: string, description: string, link: string, sharedBy: string }): Promise<Video> {
    const createdVideo = await new this.videoModel(createVideoDto);
    this.eventsGateway.notifyVideoCreated(createdVideo);
    return createdVideo.save();
  }

  async findAll(): Promise<Video[]> {
    return this.videoModel.find().exec();
  }

  async findByUser(user): Promise<Video[]> {
    return this.videoModel.find({ sharedBy: user.email }).exec();
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
