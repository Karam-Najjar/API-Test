import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { UsersComponent } from './users/users.component';
import { ListUserComponent } from './pages/list-user/list-user.component';
import { CreateUserComponent } from './pages/create-user/create-user.component';
import { ViewUserComponent } from './pages/view-user/view-user.component';
import { UserResolver } from './resolvers/user-resolver.service';

const routes: Routes = [
  {
    path: '',
    component: UsersComponent,
    children: [
      { path: '', redirectTo: 'list', pathMatch: 'full' },
      {
        path: 'list',
        component: ListUserComponent,
      },
      { path: 'create', component: CreateUserComponent },
      {
        path: ':id/view',
        component: ViewUserComponent,
        resolve: { user: UserResolver },
      },
      {
        path: ':id/update',
        component: CreateUserComponent,
        resolve: { user: UserResolver },
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UserRoutingModule {}
