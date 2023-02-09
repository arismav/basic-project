// export interface Appstate {
//     apiStatus: string;
//     apiResponseMessage: string;
// }

import * as auth from './reducers/authenticate.reducer';


export interface Appstate {
    authState: auth.State;
}

export const reducers = {
    auth: auth.reducer
};