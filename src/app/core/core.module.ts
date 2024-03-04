import { NgModule } from '@angular/core';
import { HTTP_INTERCEPTORS } from '@angular/common/http';

import { PostsService } from '../applications/modules/post/services/posts.service';
import { UsersService } from '../applications/modules/user/services/users.service';
import { AuthService } from '../auth/services/auth.service';
import { HeadersInterceptor } from '../shared/interceptors/headers-interceptor.service';

@NgModule({
  providers: [
    UsersService,
    PostsService,
    AuthService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HeadersInterceptor,
      multi: true,
    },
  ],
})
export class CoreModule {}
