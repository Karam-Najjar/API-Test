import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { ListUserComponent } from './pages/list-user/list-user.component';
import { CreateUserComponent } from './pages/create-user/create-user.component';
import { ViewUserComponent } from './pages/view-user/view-user.component';
import { UserRoutingModule } from './user-routing.module';
import { SharedModule } from '../../../shared/shared.module';

@NgModule({
  declarations: [ListUserComponent, CreateUserComponent, ViewUserComponent],
  imports: [ReactiveFormsModule, UserRoutingModule, SharedModule],
})
export class UserModule {}
