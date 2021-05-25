import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PostViewComponent } from 'src/app/posts/containers/post-view/post-view.component';
import { PostsMainComponent } from 'src/app/posts/containers/posts-main/posts-main.component';

const routes: Routes = [
  {
    path: '',
    component: PostsMainComponent
  },
  {
    path: 'view/:postId',
    component: PostViewComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PostsRoutingModule { }
