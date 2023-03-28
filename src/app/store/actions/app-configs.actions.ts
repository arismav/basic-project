import { Action } from '@ngrx/store';


export enum AuthActionTypes {
    DARKMODE = '[DarkMode] Changed',
    LANGUAGE = '[Language] Changed'
}

export class DarkMode implements Action {
    readonly type = AuthActionTypes.DARKMODE;
    constructor(public payload: boolean) { }
}

export class Language implements Action {
    readonly type = AuthActionTypes.LANGUAGE;
    constructor(public payload: string | null) { }
}

export type All =
    | DarkMode
    | Language
