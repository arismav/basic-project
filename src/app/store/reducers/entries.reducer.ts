import { createReducer, on } from "@ngrx/store";
import { IEntry } from "src/app/models/entry.model";
import { deleteEntryAPISuccess, entriesFetchAPISuccess, saveNewEntryAPISuccess, updateEntryAPISuccess } from "../actions/entries.actions";

export const initialState: ReadonlyArray<IEntry> = [];

export const entriesReducer = createReducer(
    initialState,
    on(entriesFetchAPISuccess, (state, { allEntries }) => {
        return allEntries;
    }),
    on(saveNewEntryAPISuccess, (state, { newEntry }) => {
        let newState = [...state];
        newState.push(newEntry);
        return newState;
    }),
    on(deleteEntryAPISuccess, (state, { deleteEntryId }) => {
        let newState = [...state];
        const filteredState = newState.filter((entry: IEntry) => {
            return entry.id !== deleteEntryId
        })
        return filteredState;
    }),
    on(updateEntryAPISuccess, (state, { updateEntryId, updatedEntry }) => {
        let newState = [...state];
        newState[updateEntryId - 1] = updatedEntry;
        // const filteredState = newState.filter((entry: IEntry) => {
        //     return entry.id !== deleteEntryId
        // })
        return newState;
    })
);
