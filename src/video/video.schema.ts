import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';

export type VideoDocument = Video & mongoose.Document;

@Schema()
export class Video {
  @Prop({ required: true })
  link: string;

  @Prop({ required: false })
  title: string;

  @Prop({ required: false })
  description: string;

  @Prop({ required: false })
  userId: string;
}

export const VideoSchema = SchemaFactory.createForClass(Video);
