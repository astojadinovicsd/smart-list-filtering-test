import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Post } from 'src/app/posts/model/post';

@Component({
  selector: 'ori-posts-list',
  templateUrl: './posts-list.component.html',
  styleUrls: ['./posts-list.component.scss']
})
export class PostsListComponent {

  @Input() posts: Post[];

  @Output() delete: EventEmitter<Post> = new EventEmitter();

  constructor() {}

  onDelete(post: Post): void {
    this.delete.emit(post);
  }
}
