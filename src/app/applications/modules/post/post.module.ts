import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { ListPostComponent } from './pages/list-post/list-post.component';
import { CreatePostComponent } from './pages/create-post/create-post.component';
import { ViewPostComponent } from './pages/view-post/view-post.component';
import { PostRoutingModule } from './post-routing.module';
import { PostsComponent } from './posts/posts.component';
import { SharedModule } from '../../../shared/shared.module';
import { MatIconModule } from '@angular/material/icon';

@NgModule({
  declarations: [
    PostsComponent,
    ListPostComponent,
    CreatePostComponent,
    ViewPostComponent,
  ],
  imports: [
    RouterModule,
    ReactiveFormsModule,
    PostRoutingModule,
    SharedModule,
    MatIconModule,
  ],
})
export class PostModule {}
