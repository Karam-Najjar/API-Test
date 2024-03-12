import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

import { AuthService } from '../../../../auth/services/auth.service';
import { PostListResponse } from '../interfaces/post-list-response.interface';
import { Post } from '../interfaces/post.interface';

@Injectable({ providedIn: 'root' })
export class PostsService {
  readonly baseUrl: string = 'https://dummyapi.io/data/v1/';
  postDeletedSubject = new Subject<string>();
  error = new Subject<any>();
  ID: any;
  posts: Post[] = [];

  constructor(private http: HttpClient, private authService: AuthService) {
    this.ID = this.authService.gettingId();
  }

  fetchData(endPoint: string): Observable<PostListResponse> {
    const url = `${this.baseUrl}${endPoint}`;
    return this.http.get<PostListResponse>(url);
  }

  createPost(post: any): Observable<Post> {
    const url = `${this.baseUrl}post/create`;
    return this.http.post<Post>(url, post);
  }

  updatePost(postId: string, formData: any): Observable<Post> {
    const url = `${this.baseUrl}post/${postId}`;
    return this.http.put<Post>(url, formData);
  }

  deletePost(postId: string) {
    const url = `${this.baseUrl}post/${postId}`;
    return this.http.delete(url).subscribe(() => {
      this.postDeletedSubject.next(postId);
    });
  }

  getPostById(id: string) {
    const url = `${this.baseUrl}post/${id}`;
    return this.http.get<Post>(url);
  }
}
