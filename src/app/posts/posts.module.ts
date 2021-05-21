import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { PostsListComponent } from 'src/app/posts/components/posts-list/posts-list.component';
import { PostsMainComponent } from 'src/app/posts/containers/posts-main/posts-main.component';
import { PostsRoutingModule } from 'src/app/posts/posts-routing.module';
import { PostsService } from 'src/app/posts/services/posts.service';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  declarations: [
    PostsMainComponent,
    PostsListComponent
  ],
  imports: [
    CommonModule,
    PostsRoutingModule,
    SharedModule
  ],
  providers: [
    PostsService
  ]
})
export class PostsModule { }
