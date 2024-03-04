import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';

import { UsersService } from '../../services/users.service';
import { User } from '../../interfaces/user.interface';
import { UserListResponse } from '../../interfaces/user-list-response.interface';

@Component({
  selector: 'app-list-user',
  templateUrl: './list-user.component.html',
  styleUrl: './list-user.component.css',
})
export class ListUserComponent implements OnInit, OnDestroy {
  users: User[] = [];
  private unsubscribe$ = new Subject<void>();
  isLoading: boolean = false;
  error!: string | null;

  constructor(
    private userService: UsersService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.isLoading = true;
    this.userService
      .fetchData('user?created=1')
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe({
        next: (users: UserListResponse) => {
          this.users = users.data;
          this.isLoading = false;
        },
        error: (error) => {
          this.isLoading = false;
          this.error = error.error.error;
        },
      });

    this.userService.userDeletedSubject
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe({
        next: (deletedUserId: any) => {
          this.users = this.users.filter((user) => user.id !== deletedUserId);
        },
      });
  }

  onUpdateUser(userId: string) {
    this.router.navigate(['../', userId, 'update'], {
      relativeTo: this.route,
    });
  }

  onViewUser(userId: string) {
    this.router.navigate(['../', userId, 'view'], {
      relativeTo: this.route,
    });
  }

  onDeleteUser(userId: string) {
    if (confirm('Are you sure?')) {
      this.userService.deleteUser(userId);
    }
  }

  onHandleError() {
    this.error = null;
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
}
