import { Injectable } from '@angular/core';
import {
  Resolve,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
} from '@angular/router';
import { Observable } from 'rxjs';
import { PostsService } from '../services/posts.service';

@Injectable({ providedIn: 'root' })
export class PostResolver implements Resolve<any> {
  constructor(private postService: PostsService) {}

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<any> {
    const postId = route.params['id'];
    let post = this.postService.getPostById(postId);
    return post;
  }
}
