import { Inject, Injectable } from '@nestjs/common';
import fetch from 'node-fetch';
import { AiGenerateDto } from './ai.dto';

@Injectable()
export class AiService {
  constructor(@Inject('CONFIG') private readonly config: Record<string, string | undefined>) {}

  async generate(dto: AiGenerateDto) {
    if (!this.config.openaiApiKey) {
      return { content: 'OpenAI API key missing. Please configure OPENAI_API_KEY.' };
    }

    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${this.config.openaiApiKey}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        model: 'gpt-4o-mini',
        messages: [
          {
            role: 'system',
            content: `You are a LinkedIn writing assistant. Output a concise ${dto.type.replace(
              '_',
              ' '
            )} post in a ${dto.tone} tone. Use line breaks for readability.`
          },
          { role: 'user', content: dto.prompt }
        ],
        max_tokens: 350,
        temperature: 0.7
      })
    });

    const data = (await response.json()) as {
      choices?: Array<{ message?: { content?: string } }>;
    };

    return { content: data.choices?.[0]?.message?.content ?? '' };
  }
}
