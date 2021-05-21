import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError } from 'rxjs/operators';
import { Post } from 'src/app/posts/model/post';
import { handleErrorResultResponse } from 'src/app/util/error-util';
import { environment } from 'src/environments/environment';

const API_URL = environment.apiUrl;

@Injectable()
export class PostsService {

  constructor(private http: HttpClient) {

  }

  public getPosts(): Promise<Array<Post>> {

    return this.http
      .get(`${API_URL}/posts`)
      .pipe(
        catchError(handleErrorResultResponse)
      )
      .toPromise();
  }

  public deletePost(id: number): Promise<void> {
    return this.http
      .delete(`${API_URL}/posts/${id}`)
      .pipe(
        catchError(handleErrorResultResponse)
      )
      .toPromise();
  }

}
