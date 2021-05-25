import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AccordionModule } from 'ngx-bootstrap/accordion';
import { ModalModule } from 'ngx-bootstrap/modal';
import { CreatePostModalComponent } from 'src/app/posts/components/create-post-modal/create-post-modal.component';
import { LimitResultsFilterComponent } from 'src/app/posts/components/limit-results-filter/limit-results-filter.component';
import { PostsListComponent } from 'src/app/posts/components/posts-list/posts-list.component';
import { UserIdFilterComponent } from 'src/app/posts/components/user-id-filter/user-id-filter.component';
import { PostViewComponent } from 'src/app/posts/containers/post-view/post-view.component';
import { PostsMainComponent } from 'src/app/posts/containers/posts-main/posts-main.component';
import { PostsRoutingModule } from 'src/app/posts/posts-routing.module';
import { PostsService } from 'src/app/posts/services/posts.service';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  declarations: [
    PostsMainComponent,
    PostsListComponent,
    LimitResultsFilterComponent,
    UserIdFilterComponent,
    PostViewComponent,
    CreatePostModalComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    PostsRoutingModule,
    SharedModule,
    AccordionModule.forRoot(),
    ModalModule.forChild()
  ],
  providers: [
    PostsService
  ]
})
export class PostsModule { }
