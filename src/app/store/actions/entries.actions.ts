import { Action, createAction, props } from '@ngrx/store';
import { IEntry } from 'src/app/models/entry.model';

export const invokeEntriesAPI = createAction(
    '[Entries API] Invoke Entries Fetch API'
);

export const entriesFetchAPISuccess = createAction(
    '[Entries API] Fetch API Success',
    props<{ allEntries: IEntry[] }>()
);

export const invokeSaveNewEntryAPI = createAction(
    '[Save API] Inovke save new entry api',
    props<{ newEntry: IEntry }>()
);

export const saveNewEntryAPISuccess = createAction(
    '[Save API] save new entry api success',
    props<{ newEntry: IEntry }>()
);

export const invokeDeleteEntryAPI = createAction(
    '[Delete API] Inovke delete entry api',
    props<{ deleteEntryId: number }>()
);

export const deleteEntryAPISuccess = createAction(
    '[Delete API] delete api success',
    props<{ deleteEntryId: number }>()
);


export const updateEntryAPI = createAction(
    '[Update API] Update entry api',
    props<{ updateEntryId: number, updatedEntry: IEntry }>()
);

export const updateEntryAPISuccess = createAction(
    '[Update API] Update api success',
    props<{ updateEntryId: number, updatedEntry: IEntry }>()
);

export const restoreEntries = createAction(
    '[Restore Entries] Restore entries success',
    props<{ allEntries: IEntry[] }>()
);

// export class restoreEntries implements Action {
//     readonly type = 'restoreEntries';
// }