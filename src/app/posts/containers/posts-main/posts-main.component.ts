import { Component, OnInit } from '@angular/core';
import { Post } from 'src/app/posts/model/post';
import { PostsService } from 'src/app/posts/services/posts.service';

@Component({
  selector: 'ori-posts-main',
  templateUrl: './posts-main.component.html',
  styleUrls: ['./posts-main.component.scss']
})
export class PostsMainComponent implements OnInit {

  users: Post[];

  constructor(
    private postsService: PostsService
  ) {}

  async ngOnInit(): Promise<void> {
    this.users = await this.postsService.getPosts();
    console.log(this.users, 'aaaaa');
  }

}
