import { HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';

export function handleErrorResultResponse(error: HttpErrorResponse): Observable<any | HttpErrorResponse> {

  console.error(error);
  return throwError(error);
}
