import { Action } from '@ngrx/store';


export enum AuthActionTypes {
    DARKMODE = '[DarkMode] Changed',
}

export class DarkMode implements Action {
    readonly type = AuthActionTypes.DARKMODE;
    constructor(public payload: boolean) { }
}

export type All =
    | DarkMode
