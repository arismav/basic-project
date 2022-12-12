import { Action } from '@ngrx/store';
import { IEntries } from 'src/app/models/entry.model';

export const STOREDATA = 'STOREDATA';

export class Storedata implements Action {
  readonly type = STOREDATA;

  constructor(
    public payload: {
      entries: any
    }
  ) {}
}


export type DataTableActions = Storedata
