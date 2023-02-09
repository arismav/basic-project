import { createReducer, on } from "@ngrx/store";
import { IEntry } from "src/app/models/entry.model";
import { User } from "src/app/models/user.model";
import { authFetchAPISuccess } from "../actions/authentication.actions";
import { deleteEntryAPISuccess, entriesFetchAPISuccess, saveNewEntryAPISuccess, updateEntryAPISuccess } from "../actions/entries.actions";

export const initialState: Readonly<User> = new User('', '', '');

export const authenticationReducer = createReducer(
    initialState,
    on(authFetchAPISuccess, (state, { authUser }) => {
        return authUser;
    })
);
