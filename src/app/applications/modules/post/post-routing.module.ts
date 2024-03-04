import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ViewUserComponent } from '../user/pages/view-user/view-user.component';
import { ListPostComponent } from './pages/list-post/list-post.component';
import { CreatePostComponent } from './pages/create-post/create-post.component';
import { PostResolver } from './resolvers/post-resolver.service';

const routes: Routes = [
  { path: '', redirectTo: 'list', pathMatch: 'full' },
  { path: 'list', component: ListPostComponent },
  { path: 'create', component: CreatePostComponent },
  {
    path: ':id/view',
    component: ViewUserComponent,
    resolve: { user: PostResolver },
  },
  {
    path: ':id/update',
    component: CreatePostComponent,
    resolve: { user: PostResolver },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PostRoutingModule {}
