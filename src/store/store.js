import { combineReducers, configureStore } from '@reduxjs/toolkit'
import userReducer from './userSlice'

// Create the root reducer independently to obtain the RootState type
const rootReducer = combineReducers({
  user: userReducer,
})

export function setupStore(preloadedState) {
  return configureStore({
    reducer: rootReducer,
    preloadedState,
  })
}

// hooks
import { useDispatch, useSelector } from 'react-redux'

// Use throughout your app instead of plain `useDispatch` and `useSelector`
export const useAppDispatch = useDispatch
export const useAppSelector = useSelector
