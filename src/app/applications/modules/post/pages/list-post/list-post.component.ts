import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';

import { PostsService } from '../../services/posts.service';
import { ErrorAlert } from '../../../../../shared/errors/error-alert.service';

@Component({
  selector: 'app-list-post',
  templateUrl: './list-post.component.html',
  styleUrl: './list-post.component.css',
})
export class ListPostComponent implements OnInit, OnDestroy {
  unsubscribe = new Subject();
  userDeletedSubject = new Subject();
  posts = this.postsService.posts;

  constructor(
    private postsService: PostsService,
    private router: Router,
    private errorAlert: ErrorAlert,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.postsService
      .fetchData('post')
      .pipe(takeUntil(this.unsubscribe))
      .subscribe(
        (posts: any) => {
          this.posts = posts.data;
        },
        (error) => {
          this.errorAlert.showErrorAlert(error.error.error);
        }
      );

    this.postsService.postDeletedSubject.subscribe((deletedUserId: any) => {
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

  ngOnDestroy() {
    this.unsubscribe.next(true);
    this.unsubscribe.complete();
  }

  onViewPost(index: number) {
    console.log(this.posts[index].id);
  }
}
