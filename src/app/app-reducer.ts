import { PayloadAction, createSlice } from '@reduxjs/toolkit'

import {Dispatch} from 'redux'
import {authAPI} from '../api/todolists-api'
import {setIsLoggedIn} from '../features/Login/auth-reducer'

const initialState: InitialStateType = {
    status: 'idle',
    error: null,
    isInitialized: false
}

const slice = createSlice({
    name: 'app',
    initialState,
    reducers: {
        setAppStatus: (state, action: PayloadAction<{value: RequestStatusType}>) => {
            state.status = action.payload.value
        },
        setAppError: (state, action: PayloadAction<{message: string}>) => {
            state.error = action.payload.message
        },
        setAppInitialized: (state, action: PayloadAction<{value: boolean}>) => {
            state.isInitialized = action.payload.value
        }        
    }
})

export const {setAppError, setAppStatus, setAppInitialized} = slice.actions;
export const appActions = slice.actions;
export const appReducer = slice.reducer;

export type RequestStatusType = 'idle' | 'loading' | 'succeeded' | 'failed'
export type InitialStateType = {
    // происходит ли сейчас взаимодействие с сервером
    status: RequestStatusType
    // если ошибка какая-то глобальная произойдёт - мы запишем текст ошибки сюда
    error: string | null
    // true когда приложение проинициализировалось (проверили юзера, настройки получили и т.д.)
    isInitialized: boolean
}
export const initializeAppTC = () => (dispatch: Dispatch) => {
    authAPI.me().then(res => {
        if (res.data.resultCode === 0) {
            dispatch(setIsLoggedIn({value: true}));
        } else {

        }

        dispatch(setAppInitialized({value: true}));
    })
}
