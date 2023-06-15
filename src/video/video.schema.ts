import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';

export type VideoDocument = Video & mongoose.Document;

@Schema()
export class Video {
  @Prop({ required: true })
  link: string;

  @Prop({ required: true })
  title: string;

  @Prop({ required: false })
  description: string;

  @Prop({ required: true })
  userId: string;
}

export const VideoSchema = SchemaFactory.createForClass(Video);
