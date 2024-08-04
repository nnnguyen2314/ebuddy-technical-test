import {AnyAction, combineReducers} from "@reduxjs/toolkit";
import { HYDRATE } from 'next-redux-wrapper';

import userSlice from '@modules/user/store/userSlice';

export const combinedReducer = combineReducers({
    user: userSlice
});

const reducer = (state: ReturnType<typeof combinedReducer>, action: AnyAction) => {
    if (action.type === HYDRATE) {
        const nextState = {
            ...state, // use previous state
            ...action.payload, // apply delta from hydration
        };
        return nextState;
    } else {
        return combinedReducer(state, action);
    }
};

export default reducer;