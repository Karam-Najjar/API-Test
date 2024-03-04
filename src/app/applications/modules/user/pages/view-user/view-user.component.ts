import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import { ActivatedRoute } from '@angular/router';

import { UsersService } from '../../services/users.service';
import { FullUser } from '../../interfaces/full-user.interface';
@Component({
  selector: 'app-view-user',
  templateUrl: './view-user.component.html',
  styleUrl: './view-user.component.css',
})
export class ViewUserComponent implements OnInit, OnDestroy {
  user!: FullUser;
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
