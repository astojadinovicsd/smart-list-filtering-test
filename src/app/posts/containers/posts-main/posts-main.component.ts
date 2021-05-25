import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
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
  filteredPosts: Post[];
  isLoading: boolean;
  resultLimit: number;
  userIdsOptions: number[];
  selectedUserIds: number[];

  constructor(
    private postsService: PostsService,
    private router: Router
  ) {}

  async ngOnInit(): Promise<void> {
    this.isLoading = true;
    this.posts = await this.postsService.getPosts();
    this.userIdsOptions = this.getUserIdsOptions();
    this.filterPosts();
    this.isLoading = false;
  }

  onLimitResults(resultLimit: number): void {
    this.resultLimit = resultLimit;
    this.filterPosts();
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
    this.filterPosts();
  }

  filterPosts(): void {
    let filteredPosts = Array.from(this.posts);

    if (this.selectedUserIds && this.selectedUserIds.length > 0) {
      // filter by userId
      filteredPosts = filteredPosts.filter(fp => this.selectedUserIds.includes(fp.userId));
    }

    if (this.resultLimit) {
      // limit results to number of items
      filteredPosts = filteredPosts.slice(0, this.resultLimit);
    }

    this.filteredPosts = filteredPosts;
  }

  getUserIdsOptions(): number[] {
    const mapUserIds = this.posts.map(p => p.userId);
    // return unique user ids
    return OriUtil.getUniqueValues(mapUserIds);
  }

  onFilterByUserIds(selectedUserIds): void {
    this.selectedUserIds = selectedUserIds;
    this.filterPosts();
  }

  onPostClick(post: Post): void {
    this.router.navigate(['posts', 'view', post?.id], {queryParams: {
      title: post?.title,
      body: post?.body,
      userId: post?.userId
    }});
  }

}
