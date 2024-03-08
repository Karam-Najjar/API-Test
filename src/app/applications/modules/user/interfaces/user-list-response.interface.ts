import { User } from './user.interface';

export interface UserListResponse {
  total: number;
  data: User[];
}
