import { Component, Input, OnInit } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { Subject } from 'rxjs';
import { Post } from 'src/app/posts/model/post';

@Component({
  selector: 'ori-confirmation-modal',
  templateUrl: './confirmation-modal.component.html',
  styleUrls: ['./confirmation-modal.component.scss']
})
export class ConfirmationModalComponent implements OnInit {

  @Input() title: string;
  @Input() question: string;

  public onClose: Subject<Post | boolean>;

  constructor(public bsModalRef: BsModalRef) {

  }

  ngOnInit(): void {
    this.onClose = new Subject();
  }

  decline(): void {
    this.onClose.next(false);
    this.bsModalRef.hide();
  }

  accept(): void {
    this.onClose.next(true);
    this.bsModalRef.hide();
  }

}
