import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PostsMainComponent } from 'src/app/posts/containers/posts-main/posts-main.component';

const routes: Routes = [
  {
    path: '',
    component: PostsMainComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PostsRoutingModule { }
