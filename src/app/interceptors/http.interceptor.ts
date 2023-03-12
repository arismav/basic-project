import { Injectable } from '@angular/core';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse } from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { mergeMap, delay, retryWhen, tap } from 'rxjs/operators';
import { ToastrService } from 'ngx-toastr';

export const maxRetries = 2;
export const delayMs = 2000;

@Injectable()
export class HttpResponseInterceptor implements HttpInterceptor {

    constructor(
        private _toastr: ToastrService
    ) { }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return next.handle(request).pipe(
            tap({
                next: (event) => {
                    if (event instanceof HttpResponse) {
                        console.log(event);

                    }
                    return event;
                },
                error: (error) => {
                    console.log(error);
                    this._toastr.error(error.error.error.message, error.error.error.status);

                }
            }));
    }
}
