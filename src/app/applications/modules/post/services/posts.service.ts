import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject, Subscription } from 'rxjs';
import { AuthService } from '../../../../auth/services/auth.service';

@Injectable({ providedIn: 'root' })
export class PostsService {
  postDeletedSubject = new Subject();
  error = new Subject();
  ID: any = this.authService.gettingId();
  baseUrl: string = 'https://dummyapi.io/data/v1/';
  posts: any[] = [];

  changed = new Subject<any[]>();

  constructor(private http: HttpClient, private authService: AuthService) {}

  fetchData(endPoint: string) {
    const url = `${this.baseUrl}${endPoint}`;
    return this.http.get(url);
  }

  createPost(post: any) {
    const url = `${this.baseUrl}post/create`;
    return this.http.post(url, post);
  }

  updatePost(postId: string, formData: any) {
    const url = `${this.baseUrl}post/${postId}`;
    return this.http.put(url, formData);
  }

  deletePost(postId: string) {
    const url = `${this.baseUrl}post/${postId}`;
    return this.http.delete(url).subscribe(() => {
      this.postDeletedSubject.next(postId);
    });
  }

  getPostById(id: string) {
    const url = `${this.baseUrl}post/${id}`;
    return this.http.get(url);
  }
}
