import { IsArray, IsDateString, IsIn, IsOptional, IsString, MaxLength } from 'class-validator';

export class CreatePostDto {
  @IsString()
  @MaxLength(3000)
  content: string;

  @IsOptional()
  @IsDateString()
  scheduledAt?: string;

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  hashtags?: string[];

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  mediaUrls?: string[];

  @IsOptional()
  @IsIn(['image', 'pdf', null])
  mediaType?: 'image' | 'pdf' | null;

  @IsOptional()
  @IsIn(['draft', 'scheduled'])
  status?: 'draft' | 'scheduled';
}

export class UpdatePostDto {
  @IsOptional()
  @IsString()
  @MaxLength(3000)
  content?: string;

  @IsOptional()
  @IsDateString()
  scheduledAt?: string | null;

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  hashtags?: string[];

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  mediaUrls?: string[];

  @IsOptional()
  @IsIn(['image', 'pdf', null])
  mediaType?: 'image' | 'pdf' | null;

  @IsOptional()
  @IsIn(['draft', 'scheduled'])
  status?: 'draft' | 'scheduled';
}
