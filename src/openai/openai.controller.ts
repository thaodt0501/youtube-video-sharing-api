import {Body, Controller, Param, Post, Put, Req, Res} from '@nestjs/common';
import { Request, Response } from 'express';
import { OpenaiService } from './openai.service';
import {UpdateEmailReplyDto} from "./dto/update-email-reply.dto";

@Controller()
export class OpenaiController {
  constructor(private readonly openaiService: OpenaiService) {}

  @Post('/generate-response')
  async generateResponse(@Req() request: Request, @Res() response: Response) {
    const contentResponse = await this.openaiService.generateResponse(
      request?.body?.text,
    );
    return response.status(contentResponse.status).json(contentResponse);
  }

  @Put('/update-status/:id')
  async updateStatus(@Param('id') id: string, @Body() body: UpdateEmailReplyDto, @Res() response: Response) {
    const contentResponse = await this.openaiService.update(id, body);
    return response.status(contentResponse.status).json(contentResponse);
  }
}
