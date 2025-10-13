import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpInterceptor, HttpResponse } from '@angular/common/http';
import { finalize } from 'rxjs/operators';
import { of } from 'rxjs';
import { LoadingService } from '../helpers/services/loader.service';

@Injectable()
export class LoadingInterceptor implements HttpInterceptor {
    private totalRequests = 0;

    constructor(
        private _loadingService: LoadingService
    ) { }

    intercept(request: HttpRequest<any>, next: HttpHandler) {
        this.totalRequests++;
        this._loadingService.setLoading(true);

        return next.handle(request).pipe(
            finalize(() => {
                this.totalRequests--;
                if (this.totalRequests === 0) {
                    this._loadingService.setLoading(false);
                }
            })
        );
    }
}