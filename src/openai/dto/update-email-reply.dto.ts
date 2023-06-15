export class UpdateEmailReplyDto {
  readonly emailContent?: string;
  readonly reply?: string;
  readonly isLike?: boolean;
  readonly isModify?: boolean;
  readonly isGenerateNew?: boolean;
  readonly isTransferToOutLook?: boolean;
}
