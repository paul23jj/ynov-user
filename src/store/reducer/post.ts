import { createSlice, type PayloadAction } from '@reduxjs/toolkit'
import type { Post } from '../../type/post'

interface PostState {
    posts: Post[]
}

const initialState: PostState = {
    posts: [],
}

export const postSlice = createSlice({
    name: 'post',
    initialState,
    reducers: {
        setPosts: (state, action: PayloadAction<Post[]>) => {
            state.posts = action.payload
        },
        addPost: (state, action: PayloadAction<Post>) => {
            state.posts.push(action.payload)
        },
        removePost: (state, action: PayloadAction<number>) => {
            state.posts = state.posts.filter((post) => post.id !== action.payload)
        }
    },
})

export const { setPosts, addPost, removePost } = postSlice.actions

export default postSlice.reducer