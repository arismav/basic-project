
import { IEntry } from 'src/app/models/entry.model';
import { User } from '../../models/user.model';
import * as DataTableActions from '../actions/data-table.actions';

export interface State {
  entries: IEntry | null;
}

const initialState: State = {
  entries: null
};

export function dataTableReducer(
  state = initialState,
  action: DataTableActions.DataTableActions
) {
  switch (action.type) {
    case DataTableActions.STOREDATA:
      const entries = action.payload.entries
      return {
        ...state,
        entries: entries
      };
    default:
      return state;
  }
}
