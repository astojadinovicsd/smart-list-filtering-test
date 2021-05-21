import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { PostsMainComponent } from 'src/app/posts/containers/posts-main/posts-main.component';
import { PostsRoutingModule } from 'src/app/posts/posts-routing.module';
import { PostsService } from 'src/app/posts/services/posts.service';

@NgModule({
  declarations: [
    PostsMainComponent
  ],
  imports: [
    CommonModule,
    PostsRoutingModule
  ],
  providers: [
    PostsService
  ]
})
export class PostsModule { }
