import { Injectable } from '@nestjs/common';
import { OpenAI } from 'openai';
import { ChatRequestDto, ChatResponseDto } from './ai.dto';

@Injectable()
export class AiService {
  private openai: OpenAI;

  constructor() {
    const apiKey = process.env.OPENAI_API_KEY;

    if (!apiKey) {
      throw new Error('OPENAI_API_KEY environment variable is not set');
    }

    this.openai = new OpenAI({
      apiKey: apiKey,
    });
  }

  async chat(request: ChatRequestDto): Promise<ChatResponseDto> {
    const message = request.message;

    const response = await this.openai.chat.completions.create({
      model: 'gpt-4o-mini',
      messages: [
        {
          role: 'user',
          content: message,
        },
      ],
      temperature: 0.7,
      max_tokens: 1000,
    });

    const assistantMessage = response.choices[0]?.message?.content || '';

    return {
      response: assistantMessage,
    };
  }
}
