import {
  ArrayMaxSize,
  IsArray,
  IsDateString,
  IsIn,
  IsOptional,
  IsString,
  IsUrl,
  MaxLength
} from 'class-validator';

export class CreatePostDto {
  @IsString()
  @MaxLength(3000)
  content!: string;

  @IsOptional()
  @IsDateString()
  scheduledAt?: string;

  @IsOptional()
  @IsArray()
  @ArrayMaxSize(10)
  @IsString({ each: true })
  hashtags?: string[];

  @IsOptional()
  @IsArray()
  @ArrayMaxSize(10)
  @IsUrl({}, { each: true })
  mediaUrls?: string[];

  @IsOptional()
  @IsIn(['image', 'pdf'])
  mediaType?: 'image' | 'pdf';

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
  scheduledAt?: string;

  @IsOptional()
  @IsArray()
  @ArrayMaxSize(10)
  @IsString({ each: true })
  hashtags?: string[];

  @IsOptional()
  @IsArray()
  @ArrayMaxSize(10)
  @IsUrl({}, { each: true })
  mediaUrls?: string[];

  @IsOptional()
  @IsIn(['image', 'pdf'])
  mediaType?: 'image' | 'pdf';

  @IsOptional()
  @IsIn(['draft', 'scheduled'])
  status?: 'draft' | 'scheduled';
}
