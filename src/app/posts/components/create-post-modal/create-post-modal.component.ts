import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { Subject } from 'rxjs';
import { Post } from 'src/app/posts/model/post';

@Component({
  selector: 'ori-create-post-modal',
  templateUrl: './create-post-modal.component.html',
  styleUrls: ['./create-post-modal.component.scss']
})
export class CreatePostModalComponent implements OnInit {

  public onClose: Subject<Post | boolean>;

  form: FormGroup;

  constructor(public bsModalRef: BsModalRef) {

  }

  ngOnInit(): void {
    this.onClose = new Subject();
    this.createForm();
  }

  close(): void {
    this.onClose.next(false);
    this.bsModalRef.hide();
  }

  onSubmit(): void {
    this.onClose.next(this.form.getRawValue());
  }

  createForm(): void {
    this.form = new FormGroup({
      title: new FormControl('', Validators.required),
      body: new FormControl('', Validators.required),
      userId: new FormControl('', Validators.required)
    });
  }

}
