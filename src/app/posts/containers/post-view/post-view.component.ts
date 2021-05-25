import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Comment } from 'src/app/posts/model/comment';
import { PostsService } from 'src/app/posts/services/posts.service';

@Component({
  selector: 'ori-post-view',
  templateUrl: './post-view.component.html',
  styleUrls: ['./post-view.component.scss']
})
export class PostViewComponent implements OnInit {

  postId: number;
  title: string;
  body: string;
  userId: number;
  isPostLoading: boolean;
  comments: Comment[];
  isCommentsLoading: boolean;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private postsService: PostsService
  ) {}

  async ngOnInit(): Promise<void> {

    this.postId = this.route.snapshot.params['postId'];
    this.title = this.route.snapshot.queryParams['title'];
    this.body = this.route.snapshot.queryParams['body'];
    this.userId = this.route.snapshot.queryParams['userId'];

    if (!this.title && this.postId) {
      await this.fetchPostById();
    }

    await this.fetchComments();
  }

  async fetchPostById(): Promise<void> {
    this.isPostLoading = true;

    const postResponse = await this.postsService.getPostById(this.postId);

    this.title = postResponse?.title;
    this.body = postResponse?.body;
    this.userId = postResponse?.userId;

    this.isPostLoading = false;
  }

  async fetchComments(): Promise<void> {
    this.isCommentsLoading = true;
    this.comments = await this.postsService.getPostComments(this.postId);
    this.isCommentsLoading = false;
  }

  goBack(): void {
    this.router.navigateByUrl('posts', {replaceUrl: true});
  }

}
