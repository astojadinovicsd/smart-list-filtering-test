import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'ori-user-id-filter',
  templateUrl: './user-id-filter.component.html',
  styleUrls: ['./user-id-filter.component.scss']
})
export class UserIdFilterComponent {

  @Input() userIdOptions: number[];

  @Output() filterByUserIds: EventEmitter<Array<number>> = new EventEmitter();

  selectedUserIds = [];

  constructor() {}

  onChange(userId: number, isChecked: boolean): void {
    if (isChecked) {
      this.selectedUserIds.push(userId);
    } else {
      const index = this.selectedUserIds.indexOf(userId);
      this.selectedUserIds.splice(index, 1);
    }

    this.filterByUserIds.emit(Array.from(this.selectedUserIds));
  }

}
