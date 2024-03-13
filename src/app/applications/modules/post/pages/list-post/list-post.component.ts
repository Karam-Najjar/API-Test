import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';

import { PostsService } from '../../services/posts.service';
import { Post } from '../../interfaces/post.interface';

@Component({
  selector: 'app-list-post',
  templateUrl: './list-post.component.html',
  styleUrls: ['./list-post.component.css'],
})
export class ListPostComponent implements OnInit, OnDestroy {
  // Subject to unsubscribe from observables
  private unsubscribe$ = new Subject<void>();
  // Array to hold posts
  posts: Post[] = [];
  // Flag to indicate loading state
  isLoading: boolean = false;
  // Error message
  error!: string | null;

  constructor(
    private postsService: PostsService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    // Set loading state to true
    this.isLoading = true;

    // Fetch posts data
    this.postsService
      .fetchData('post')
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe({
        next: (posts: any) => {
          // Assign fetched posts data
          this.posts = posts.data;
          // Set loading state to false
          this.isLoading = false;
        },
        error: (error) => {
          // Set loading state to false
          this.isLoading = false;
          // Assign error message
          this.error = error.error.error;
        },
      });

    // Subscribe to postDeletedSubject to update posts list when a post is deleted
    this.postsService.postDeletedSubject
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe((deletedUserId: string) => {
        // Filter out the deleted post
        this.posts = this.posts.filter((post) => post.id !== deletedUserId);
      });
  }

  // Navigate to update post page
  onUpdatePost(index: number) {
    const postId = this.posts[index].id;
    this.router.navigate(['../', postId, 'update'], {
      relativeTo: this.route,
    });
  }

  // Delete a post
  onDeletePost(index: number) {
    const postId = this.posts[index].id;
    // Confirm deletion with the user
    if (confirm('Are you sure?')) {
      this.postsService.deletePost(postId);
    }
  }

  // View post details (temporary function)
  onViewPost(post: Post) {
    console.log(post);
  }

  // Clear error message
  onHandleError() {
    this.error = null;
  }

  ngOnDestroy() {
    // Unsubscribe from observables to prevent memory leaks
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
}
