import { InjectModel } from '@nestjs/mongoose';
import { HttpStatus, Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { Configuration, OpenAIApi } from 'openai';
import { EmailReply, EmailReplyDocument } from 'schemas/email-replies.schema';

@Injectable()
export class OpenaiService {
  constructor(
    @InjectModel(EmailReply.name)
    private readonly emailReplyModel: Model<EmailReplyDocument>,
  ) {}

  private readonly configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY,
    organization: process.env.ORGANIZATION_KEY,
  });
  private openai = new OpenAIApi(this.configuration);

  async generateResponse(emailContent: string) {
    try {
      const contentGenerated = generatePrompt(emailContent)
      const prompt =
        'Write a response to this email: ' + contentGenerated;

      const isInvalidText = await this.checkInvalidText(emailContent);

      const completion = await this.openai.createCompletion({
        model: 'text-davinci-003',
        prompt: prompt,
        temperature: 0.5,
        max_tokens: 256,
        top_p: 1,
        frequency_penalty: 0,
        presence_penalty: 0,
      });
      const topicSubject = completion.data.choices[0].text.trim();
      const toHtml = topicSubject.replace('\n', '</b> <br/> </b> <br/>');

      if (!isInvalidText) {
        const newEmailReply = await this.emailReplyModel.create({
          emailContent: contentGenerated,
          reply: topicSubject,
          flagged: false,
          htmlRawEmail: emailContent
        });
        return {
          result: toHtml,
          status: HttpStatus.OK,
          message: 'OK',
          data: {
            id: newEmailReply._id.toString(),
          },
        };
      }

      await this.emailReplyModel.create({
        emailContent: contentGenerated,
        reply: topicSubject,
        flagged: true,
        htmlRawEmail: emailContent
      });
      return {
        result: 'Invalid text',
        status: HttpStatus.BAD_REQUEST,
        message: 'error',
      };
    } catch (e) {
      console.log(e);
      return {
        result: e.response,
        status: HttpStatus.INTERNAL_SERVER_ERROR,
        message: 'error',
      };
    }
  }

  async update(emailReplyId, update) {
    update = {
      ...update,
      updatedAt: new Date(),
    };
    try {
      const emailReply = await this.emailReplyModel.findOneAndUpdate(
        { _id: emailReplyId },
        update,
        { new: true },
      );
      return {
        result: emailReply,
        status: HttpStatus.OK,
        message: 'OK',
      };
    } catch (e) {
      return {
        result: e.response,
        status: HttpStatus.INTERNAL_SERVER_ERROR,
        message: 'error',
      };
    }
  }

  async checkInvalidText(text) {
    let isInvalidText = false;
    const checkText = await this.openai.createModeration({
      input: text,
    });
    const flagged = checkText.data.results[0].flagged;
    if (flagged === true) {
      isInvalidText = true;
    }

    return isInvalidText;
  }
}

const generatePrompt = (text) => {
  text = decodeURI(text);
  const textParagraphsCleaned = text.split('  ');

  let textParagraphsString = textParagraphsCleaned.join('\n\n');
  // No url
  textParagraphsString = textParagraphsString.replace(URL_REGEX, ' ');
  // No email
  textParagraphsString = textParagraphsString.replace(EMAIL_REGEX, ' ');
  // No phone number
  textParagraphsString = textParagraphsString.replace(PHONE_REGEX, ' ');

  textParagraphsString = textParagraphsString.substring(0, 2000);

  return textParagraphsString;
};

const URL_REGEX =
  '(?:^|(?<![\\w\\/\\.]))(?:(?:https?:\\/\\/|ftp:\\/\\/|www\\d{0,3}\\.))(?:\\S+(?::\\S*)?@)?(?:(?!' +
  '(?:10|127)(?:\\.\\d{1,3}){3})(?!(?:169\\.254|192\\.168)(?:\\.\\d{1,3}){2})(?!172\\.(?:1[6-9]|2\\d|3[0-1])' +
  '(?:\\.\\d{1,3}){2})(?:[1-9]\\d?|1\\d\\d|2[01]\\d|22[0-3])(?:\\.(?:1?\\d{1,2}|2[0-4]\\d|25[0-5])){2}' +
  '(?:\\.(?:[1-9]\\d?|1\\d\\d|2[0-4]\\d|25[0-4]))|(?:(?:[a-z\\\u00a1-\\\uffff0-9]-?)*[a-z\\\u00a1-\\\uffff0-9]+)' +
  '(?:\\.(?:[a-z\\\u00a1-\\\uffff0-9]-?)*[a-z\\\u00a1-\\\uffff0-9]+)*' +
  '(?:\\.(?:[a-z\\\u00a1-\\\uffff]{2,}))" r"|" r"(?:(localhost))" r")(?::\\d{2,5})?(?:\\/[^\\)\\]\\}\\s]*)?';
const EMAIL_REGEX =
  '(?:^|(?<=[^w@.)]))([w+-](.(?!.))?)*?[w+-](@|[(<{[]at[)>}]])(?:(?:[a-z\\u00a1-\\uffff0-9]-?)' +
  '*[a-z\\u00a1-\\uffff0-9]+)(?:.(?:[a-z\\u00a1-\\uffff0-9]-?)*[a-z\\u00a1-\\uffff0-9]+)*(?:.(?:[a-z\\u00a1-\\uffff]{2,}))';
const PHONE_REGEX =
  '((?:^|(?<=[^w)]))(((+?[01])|(+d{2}))[ .-]?)?((?d{3,4})?/?[ .-]?)?(d{3}[ .-]?d{4})' +
  '(s?(?:ext.?|[#x-])s?d{2,6})?(?:$|(?=W)))|+?d{4,5}[ .-/]d{6,9}';
