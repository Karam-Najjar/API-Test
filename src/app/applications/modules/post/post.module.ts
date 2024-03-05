import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { ListPostComponent } from './pages/list-post/list-post.component';
import { CreatePostComponent } from './pages/create-post/create-post.component';
import { ViewPostComponent } from './pages/view-post/view-post.component';
import { PostRoutingModule } from './post-routing.module';
import { SharedModule } from '../../../shared/shared.module';
import { MatIconModule } from '@angular/material/icon';
import { SummaryComponent } from '../../../summary/summary.component';

@NgModule({
  declarations: [ListPostComponent, CreatePostComponent, ViewPostComponent],
  imports: [
    RouterModule,
    PostRoutingModule,
    SharedModule,
    MatIconModule,
    SummaryComponent,
  ],
})
export class PostModule {}
