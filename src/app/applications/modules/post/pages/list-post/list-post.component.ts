import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';

import { PostsService } from '../../services/posts.service';
import { Post } from '../../interfaces/post.interface';

@Component({
  selector: 'app-list-post',
  templateUrl: './list-post.component.html',
  styleUrl: './list-post.component.css',
})
export class ListPostComponent implements OnInit, OnDestroy {
  postDeletedSubject = new Subject();
  private unsubscribe$ = new Subject<void>();
  posts: Post[] = [];
  isLoading: boolean = false;
  error!: string | null;

  constructor(
    private postsService: PostsService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.isLoading = true;
    this.postsService
      .fetchData('post')
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe({
        next: (posts: any) => {
          this.posts = posts.data;
          this.isLoading = false;
        },
        error: (error) => {
          this.isLoading = false;
          this.error = error.error.error;
        },
      });

    this.postsService.postDeletedSubject
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe((deletedUserId: string) => {
        this.posts = this.posts.filter((post) => post.id !== deletedUserId);
      });
  }

  onUpdatePost(index: number) {
    const postId = this.posts[index].id;
    this.router.navigate(['../', postId, 'update'], {
      relativeTo: this.route,
    });
  }

  onDeletePost(index: number) {
    const postId = this.posts[index].id;
    if (confirm('Are you sure?')) {
      this.postsService.deletePost(postId);
    }
  }
  onViewPost(post: Post) {
    console.log(post);
  }

  onHandleError() {
    this.error = null;
  }

  ngOnDestroy() {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
}
