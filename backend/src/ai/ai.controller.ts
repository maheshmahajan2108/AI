import { Controller, Post, Body } from '@nestjs/common';
import { AiService } from './ai.service';
import { ChatRequestDto, ChatResponseDto } from './ai.dto';

@Controller('ai')
export class AiController {
  constructor(private aiService: AiService) {}

  @Post('chat')
  async chat(@Body() request: ChatRequestDto): Promise<ChatResponseDto> {
    return this.aiService.chat(request);
  }
}
