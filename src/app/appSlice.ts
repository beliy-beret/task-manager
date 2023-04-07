import { PayloadAction, createSlice } from '@reduxjs/toolkit'

import { AppThunk } from './store'
import { authAPI } from 'api/todolists-api'
import { authActions } from 'features/Login/authSlice'

export * as appSelectors from './selectors' 

const initialState = {
    status: 'idle' as RequestStatusType,
    error: null as null | string,
    isInitialized: false
}
export type InitialStateType = typeof initialState 
const slice = createSlice({
    name: 'app',
    initialState,
    reducers: {
        setAppStatus: (state, action: PayloadAction<{status: RequestStatusType}>) => {
            state.status = action.payload.status
        },
        setAppError: (state, action: PayloadAction<{message: string | null}>) => {
            state.error = action.payload.message
        },
        setAppInitialized: (state, action: PayloadAction<{isInitialized: boolean}>) => {
            state.isInitialized = action.payload.isInitialized
        }        
    }
})

export const appActions = slice.actions;
export const appReducer = slice.reducer;

export type RequestStatusType = 'idle' | 'loading' | 'succeeded' | 'failed'

export const initializeAppTC = (): AppThunk => (dispatch) => {
    authAPI.me().then(res => {
        if (res.data.resultCode === 0) {
            dispatch(authActions.setIsLoggedIn({isLoggedIn: true}));
        } else {

        }

        dispatch(appActions.setAppInitialized({isInitialized: true}));
    })
}
