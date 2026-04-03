import { IsIn, IsString, MaxLength } from 'class-validator';

export class AiGenerateDto {
  @IsIn(['thought_leadership', 'personal_story', 'hiring', 'product_launch', 'job_search'])
  type!: 'thought_leadership' | 'personal_story' | 'hiring' | 'product_launch' | 'job_search';

  @IsIn(['professional', 'casual', 'bold', 'friendly'])
  tone!: 'professional' | 'casual' | 'bold' | 'friendly';

  @IsString()
  @MaxLength(500)
  prompt!: string;
}
