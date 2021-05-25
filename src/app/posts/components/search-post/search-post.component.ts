import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'ori-search-post',
  templateUrl: './search-post.component.html',
  styleUrls: ['./search-post.component.scss']
})
export class SearchPostComponent {

  @Output() search: EventEmitter<string> = new EventEmitter();

  onSearch(event): void {
    this.search.emit(event.target.value);
  }

}
