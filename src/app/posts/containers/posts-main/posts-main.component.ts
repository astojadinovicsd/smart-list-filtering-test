import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BsModalService } from 'ngx-bootstrap/modal';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { CreatePostModalComponent } from 'src/app/posts/components/create-post-modal/create-post-modal.component';
import { Post } from 'src/app/posts/model/post';
import { PostsService } from 'src/app/posts/services/posts.service';
import { ConfirmationModalComponent } from 'src/app/shared/components/confirmation-modal/confirmation-modal.component';
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
  searchText: string;

  private destroy$: Subject<boolean> = new Subject<boolean>();

  constructor(
    private postsService: PostsService,
    private router: Router,
    private modalService: BsModalService
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

  onDeleteClicked(post: Post): void {

    const modalInitialState = {
      title: 'Are you sure?',
      question: `Are you sure that you want to delete the post with the title: "${post?.title}"`
    };
    const modalRef = this.modalService.show(ConfirmationModalComponent, {
      initialState: modalInitialState
    });
    const modalContent: ConfirmationModalComponent = modalRef.content as ConfirmationModalComponent;

    modalContent.onClose
      .pipe(takeUntil(this.destroy$))
      .subscribe(
        (confirmed) => {
          if (confirmed) {
            this.deletePost(post);
          }
        });
  }

  deletePost(post: Post): void {
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

    if (this.searchText) {
      // search by title
      filteredPosts = this.filterBySearchText(filteredPosts, this.searchText);
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

  onCreateNewPost(): void {
    const modalRef = this.modalService.show(CreatePostModalComponent);
    const modalContent: CreatePostModalComponent = modalRef.content as CreatePostModalComponent;

    modalContent.onClose
      .pipe(takeUntil(this.destroy$))
      .subscribe((newPost: Post) => {
        if (!!newPost) {

          this.postsService.createPost(newPost).then((response: Post) => {
            this.posts.push(response);
            this.filterPosts();
            modalContent.bsModalRef.hide();
          }).catch((error) => {
            console.log('Error:', error);
          });
        }
      });
  }

  onSearch(searchText: string): void {
    this.searchText = searchText;
    this.filterPosts();
  }

  filterBySearchText(posts: Post[], searchText: string): Post[] {
    const conditionSatisfied = [];

    posts.forEach((p) => {
      const lcTitle = p?.title.toLowerCase();
      const lcSearchText = searchText.toLowerCase();

      // does post title contains search text?
      if (lcTitle.indexOf(lcSearchText) > -1) {

        if (lcTitle.startsWith(lcSearchText)) {
          // prioritize search with start of the title first
          conditionSatisfied.unshift(p);
        } else {
          // lower priority if string just contains
          conditionSatisfied.push(p);
        }
      }
    });

    return conditionSatisfied;
  }

}
