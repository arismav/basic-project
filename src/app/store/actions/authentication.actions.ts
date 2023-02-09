import { createAction, props } from '@ngrx/store';
import { IEntry } from 'src/app/models/entry.model';
import { User } from 'src/app/models/user.model';

export const invokeAuthAPI = createAction(
    '[Auth API] Invoke Auth API',
    props<{ username: string, password: string }>()
);

export const authFetchAPISuccess = createAction(
    '[Auth API] Auth API Success',
    props<{ authUser: User }>()
);
