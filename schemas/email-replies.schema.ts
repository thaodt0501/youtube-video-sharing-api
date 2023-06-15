import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type EmailReplyDocument = HydratedDocument<EmailReply>;

@Schema({ versionKey: false })
export class EmailReply {
  @Prop()
  emailContent: string;

  @Prop()
  reply: string;

  @Prop()
  isLike?: boolean;

  @Prop()
  flagged: boolean;

  @Prop()
  isModify: boolean;

  @Prop()
  isGenerateNew: boolean;

  @Prop()
  isTransferToOutLook: boolean;

  @Prop()
  htmlRawEmail: string;

  @Prop({ required: true, default: new Date() })
  createdAt: Date;

  @Prop()
  updatedAt: Date;

  versionKey: false;
}

export const EmailReplySchema = SchemaFactory.createForClass(EmailReply);
