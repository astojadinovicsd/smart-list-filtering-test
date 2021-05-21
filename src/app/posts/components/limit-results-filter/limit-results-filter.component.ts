import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'ori-limit-results-filter',
  templateUrl: './limit-results-filter.component.html',
  styleUrls: ['./limit-results-filter.component.scss']
})
export class LimitResultsFilterComponent {

  limitOptions: number[] = [5, 10, 15, 25];
  selectedLimit: number;

  @Output() limitResults: EventEmitter<number> = new EventEmitter();

  constructor() {}

  onChange(newValue): void {
    this.selectedLimit = newValue;
    this.limitResults.emit(newValue);
  }

}
