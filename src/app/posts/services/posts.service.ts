import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError } from 'rxjs/operators';
import { Comment } from 'src/app/posts/model/comment';
import { Post } from 'src/app/posts/model/post';
import { ErrorService } from 'src/app/shared/services/error.service';
import { environment } from 'src/environments/environment';

const API_URL = environment.apiUrl;

@Injectable()
export class PostsService {

  constructor(
    private http: HttpClient,
    private errorService: ErrorService
  ) {}

  public getPosts(): Promise<Array<Post>> {

    return this.http
      .get(`${API_URL}/posts`)
      .pipe(
        catchError((err => this.errorService.handleError(err)))
      )
      .toPromise();
  }

  public deletePost(id: number): Promise<void> {
    return this.http
      .delete(`${API_URL}/posts/${id}`)
      .pipe(
        catchError((err => this.errorService.handleError(err)))
      )
      .toPromise();
  }

  public getPostById(id: number): Promise<Post> {

    return this.http
      .get(`${API_URL}/posts/${id}`)
      .pipe(
        catchError((err => this.errorService.handleError(err)))
      )
      .toPromise();
  }

  public getPostComments(id: number): Promise<Array<Comment>> {

    return this.http
      .get(`${API_URL}/posts/${id}/comments`)
      .pipe(
        catchError((err => this.errorService.handleError(err)))
      )
      .toPromise();
  }

  public createPost(post: Post): Promise<Post> {
    return this.http
      .post(`${API_URL}/posts/`, post)
      .pipe(
        catchError((err => this.errorService.handleError(err)))
      )
      .toPromise();
  }

}
