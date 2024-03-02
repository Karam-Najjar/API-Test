import { Component, OnDestroy, OnInit } from '@angular/core';

import { UsersService } from '../../services/users.service';
import { ActivatedRoute } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
@Component({
  selector: 'app-view-user',
  templateUrl: './view-user.component.html',
  styleUrl: './view-user.component.css',
})
export class ViewUserComponent implements OnInit, OnDestroy {
  // users = this.usersService.users;
  user: any;
  userId!: any;
  private unsubscribe = new Subject<void>();
  public userData: any;

  constructor(
    private usersService: UsersService,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.userId = this.route.snapshot.params['id'];
    this.usersService
      .viewUser(this.userId)
      .pipe(takeUntil(this.unsubscribe))
      .subscribe((userData) => {
        this.user = userData;
      });
  }

  ngOnDestroy(): void {
    this.unsubscribe.next();
    this.unsubscribe.complete();
  }
}
