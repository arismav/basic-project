import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { select, Store } from '@ngrx/store';
import { EMPTY, map, mergeMap, withLatestFrom, switchMap } from 'rxjs';
import { DashboardService } from 'src/app/components/dashboard/dashboard.service';
import { deleteEntryAPISuccess, entriesFetchAPISuccess, invokeDeleteEntryAPI, invokeSaveNewEntryAPI, saveNewEntryAPISuccess, updateEntryAPI, updateEntryAPISuccess } from '../actions/entries.actions';
import { selectEntries } from '../selectors/entries.selector';
import { invokeEntriesAPI } from '../actions/entries.actions';
import { Appstate } from '../appstate';
import { setAPIStatus } from '../actions/app.actions';

@Injectable()
export class EntriesEffect {
    constructor(
        private actions$: Actions,
        private dashboardService: DashboardService,
        private store: Store,
        private appStore: Store<Appstate>
    ) { }

    loadAllEntries$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(invokeEntriesAPI),
            withLatestFrom(this.store.pipe(select(selectEntries))),
            mergeMap(([, entryformStore]) => {
                if (entryformStore.length > 0) {
                    return EMPTY;
                }
                return this.dashboardService
                    .getTableData()
                    .pipe(map((data) => entriesFetchAPISuccess({ allEntries: data })));
            })
        )
    });


    // saveNewBook$ = createEffect(() => {
    //     return this.actions$.pipe(
    //         ofType(invokeSaveNewEntryAPI),
    //         switchMap((action) => {
    //             return saveNewEntryAPISuccess({ newEntry: action.newEntry });
    //         })
    //     );
    // });

    saveNewBook$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(invokeSaveNewEntryAPI),
            switchMap((action) => {
                // this.appStore.dispatch(
                //     setAPIStatus({ apiStatus: { apiResponseMessage: '', apiStatus: '' } })
                // );
                return this.dashboardService.create(action.newEntry)
                    .pipe(
                        map((data) => {
                            // this.appStore.dispatch(
                            //     setAPIStatus({
                            //         apiStatus: { apiResponseMessage: '', apiStatus: 'success' },
                            //     })
                            // );
                            return saveNewEntryAPISuccess({ newEntry: data });
                        })
                    );
            })
        );
    });

    deleteBook$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(invokeDeleteEntryAPI),
            switchMap((action) => {
                // this.appStore.dispatch(
                //     setAPIStatus({ apiStatus: { apiResponseMessage: '', apiStatus: '' } })
                // );
                return this.dashboardService.delete(action.deleteEntryId)
                    .pipe(
                        map((data) => {
                            // this.appStore.dispatch(
                            //     setAPIStatus({
                            //         apiStatus: { apiResponseMessage: '', apiStatus: 'success' },
                            //     })
                            // );
                            return deleteEntryAPISuccess({ deleteEntryId: data });
                        })
                    );
            })
        );
    });


    updateBook$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(updateEntryAPI),
            switchMap((action) => {
                // this.appStore.dispatch(
                //     setAPIStatus({ apiStatus: { apiResponseMessage: '', apiStatus: '' } })
                // );
                return this.dashboardService.update(action.updateEntryId, action.updatedEntry)
                    .pipe(
                        map((data) => {
                            // this.appStore.dispatch(
                            //     setAPIStatus({
                            //         apiStatus: { apiResponseMessage: '', apiStatus: 'success' },
                            //     })
                            // );
                            return updateEntryAPISuccess({ updateEntryId: data.updateIndex, updatedEntry: data.updateEntry });
                        })
                    );
            })
        );
    });
}