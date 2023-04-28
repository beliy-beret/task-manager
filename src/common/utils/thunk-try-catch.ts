import { AppDispatch, AppRootStateType } from 'app/store'

import { BaseThunkAPI } from '@reduxjs/toolkit/dist/createAsyncThunk'
import { ResponseType } from 'common/types'
import { appActions } from 'app/app.reducer'
import { handleServerNetworkError } from 'common/utils/handle-server-network-error'

export const thunkTryCatch = async (
  thunkAPI: BaseThunkAPI<
    AppRootStateType,
    any,
    AppDispatch,
    null | ResponseType
  >,
  logic: () => void
) => {
  const { dispatch, rejectWithValue } = thunkAPI
  try {
    return await logic()
  } catch (e) {
    handleServerNetworkError(e, dispatch)
    return rejectWithValue(null)
  } finally {
    dispatch(appActions.setAppStatus({ status: 'idle' }))
  }
}
