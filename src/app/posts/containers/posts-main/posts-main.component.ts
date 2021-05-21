import { Component, OnInit } from '@angular/core';
import { Post } from 'src/app/posts/model/post';
import { PostsService } from 'src/app/posts/services/posts.service';
import { OriUtil } from 'src/app/util/ori-util';

@Component({
  selector: 'ori-posts-main',
  templateUrl: './posts-main.component.html',
  styleUrls: ['./posts-main.component.scss']
})
export class PostsMainComponent implements OnInit {

  posts: Post[];
  isLoading: boolean;

  constructor(
    private postsService: PostsService
  ) {}

  async ngOnInit(): Promise<void> {
    this.isLoading = true;
    this.posts = await this.postsService.getPosts();
    this.isLoading = false;
    console.log(this.posts, 'aaaaa');
  }

  onDelete(post: Post): void {
    this.isLoading = true;
    this.postsService.deletePost(post?.id).then((response) => {
      // Important: resource will not be really updated on the server but it will be faked as if.
      console.log('Deleted Post', post);
      this.removeItemFromTheList(post?.id);
    }).finally(() => {
      this.isLoading = false;
    });
  }

  removeItemFromTheList(id: number): void {
    const removeIndex = this.posts.map(item => item.id).indexOf(id);
    this.posts = OriUtil.spliceNoMutate(this.posts, removeIndex);
  }

}
