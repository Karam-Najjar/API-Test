/**
 * This Injectable service manages interactions with the backend API
 * for retrieving, creating, updating, and deleting posts.
 */
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

import { AuthService } from '../../../../auth/services/auth.service';
import { PostListResponse } from '../interfaces/post-list-response.interface';
import { Post } from '../interfaces/post.interface';

@Injectable({ providedIn: 'root' })
export class PostsService {
  /**
   * The base URL for the backend API.
   */
  readonly baseUrl: string = 'https://dummyapi.io/data/v1/';

  /**
   * A Subject to emit events when a post is deleted.
   */
  postDeletedSubject = new Subject<string>();

  /**
   * A Subject to emit errors encountered during API interactions.
   */
  error = new Subject<any>();

  /**
   * The ID of the authenticated user.
   */
  ID: any;

  /**
   * An array to store fetched posts.
   */
  posts: Post[] = [];

  /**
   * Constructor to inject the HttpClient and AuthService.
   * @param http The HttpClient service for making HTTP requests.
   * @param authService The AuthService for handling authentication.
   */
  constructor(private http: HttpClient, private authService: AuthService) {
    // Fetching the authenticated user's ID
    this.ID = this.authService.gettingId();
  }

  /**
   * Method to fetch data from the backend API.
   * @param endPoint The API endpoint to fetch data from.
   * @returns An Observable of type PostListResponse containing the fetched data.
   */
  fetchData(endPoint: string): Observable<PostListResponse> {
    const url = `${this.baseUrl}${endPoint}`;
    return this.http.get<PostListResponse>(url);
  }

  /**
   * Method to create a new post.
   * @param post The post data to be created.
   * @returns An Observable of type Post representing the created post.
   */
  createPost(post: any): Observable<Post> {
    const url = `${this.baseUrl}post/create`;
    return this.http.post<Post>(url, post);
  }

  /**
   * Method to update an existing post.
   * @param postId The ID of the post to be updated.
   * @param formData The updated post data.
   * @returns An Observable of type Post representing the updated post.
   */
  updatePost(postId: string, formData: any): Observable<Post> {
    const url = `${this.baseUrl}post/${postId}`;
    return this.http.put<Post>(url, formData);
  }

  /**
   * Method to delete a post.
   * @param postId The ID of the post to be deleted.
   */
  deletePost(postId: string) {
    const url = `${this.baseUrl}post/${postId}`;
    return this.http.delete(url).subscribe(() => {
      // Emitting an event to indicate that a post has been deleted
      this.postDeletedSubject.next(postId);
    });
  }

  /**
   * Method to fetch a post by its ID.
   * @param id The ID of the post to fetch.
   * @returns An Observable of type Post containing the fetched post data.
   */
  getPostById(id: string) {
    const url = `${this.baseUrl}post/${id}`;
    return this.http.get<Post>(url);
  }
}
