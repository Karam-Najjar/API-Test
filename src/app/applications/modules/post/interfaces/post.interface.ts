import { FullUser } from '../../user/interfaces/full-user.interface';

export interface Post {
  id: string;
  text: string;
  image: string;
  likes: number;
  tags: string[];
  publishDate?: string;
  owner: FullUser;
}
