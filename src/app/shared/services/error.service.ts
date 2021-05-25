import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Observable, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ErrorService {

  constructor(
    private toastrService: ToastrService
  ) {}

  public handleError(response: any): Observable<any> {
    console.log('ErrorService::handleError: ', response);

    switch (response.status) {
      case 400:
        this.handleErrorMessages(response);
        break;
      case 401:
        this.handleErrorMessages(response);
        // this.router.navigate(['/login']);
        break;
      case 403:
        this.handleErrorMessages(response);
        // this.router.navigate(['/login']);
        break;
      case 404:
        this.toastrService.error('404_not_found_error');
        break;
      case 500:
        this.toastrService.error('internal_server_error');
        break;
      default:
        this.toastrService.error('general_error');
        break;
    }

    return throwError(response);
  }

  private handleErrorMessages(response: HttpErrorResponse): void {
    let errorMessages: string[] = [];

    const errors = response?.error?.errors;
    const messages = response?.error?.messages;

    if (errors) {
      errorMessages = errors?.map((error) => error.message);
    } else if (messages) {
      errorMessages = messages?.map((error) => error.code);
    }

    errorMessages.forEach(this.toastrService.error.bind(this.toastrService));
  }

}
