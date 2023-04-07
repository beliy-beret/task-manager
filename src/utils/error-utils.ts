import {Dispatch} from 'redux'
import { ResponseType } from 'api/todolists-api'
import { appActions } from 'app/appSlice'

export const handleServerAppError = <D>(data: ResponseType<D>, dispatch: Dispatch) => {
    if (data.messages.length) {
        dispatch(appActions.setAppError({message: data.messages[0]}))
    } else {
        dispatch(appActions.setAppError({message: 'Some error occurred'}))
    }
    dispatch(appActions.setAppStatus({status: 'failed'}))
}

export const handleServerNetworkError = (error: { message: string }, dispatch: Dispatch) => {
    dispatch(appActions.setAppError(error.message ? {message: error.message} : {message: 'Some error occurred'}))
    dispatch(appActions.setAppStatus({status: 'failed'}))
}
