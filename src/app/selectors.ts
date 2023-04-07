import { AppRootStateType } from './store';
import { RequestStatusType } from './appSlice';

export const error = (state: AppRootStateType): string | null => state.app.error
export const status = (state: AppRootStateType): RequestStatusType => state.app.status
export const isInitialized = (state: AppRootStateType): boolean => state.app.isInitialized

