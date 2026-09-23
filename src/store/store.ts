import { configureStore } from '@reduxjs/toolkit'
import userReducer from './reducer/user'
import authReducer from './reducer/auth'
import loadingReducer from './reducer/loading'
import postReducer from './reducer/post'
import commentReducer from './reducer/comment'

export const store = configureStore({
    reducer: {
        user: userReducer,
        auth: authReducer,
        loading: loadingReducer,
        post: postReducer,
        comment: commentReducer
    },
})

export type AppStore = typeof store
export type RootState = ReturnType<AppStore['getState']>
export type AppDispatch = AppStore['dispatch']