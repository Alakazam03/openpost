export type PostStatus = 'draft' | 'scheduled' | 'published' | 'failed';

export interface ScheduledPost {
  id: string;
  content: string;
  status: PostStatus;
  scheduledAt: string | null;
  hashtags: string[];
  mediaUrls: string[];
  mediaType: 'image' | 'pdf' | null;
}

export interface AiRequest {
  type: 'thought_leadership' | 'personal_story' | 'hiring' | 'product_launch' | 'job_search';
  tone: 'professional' | 'casual' | 'bold' | 'friendly';
  prompt: string;
}
