import { createSlice, type PayloadAction } from '@reduxjs/toolkit'
import type { Comment } from '../../type/comment'

interface CommentState {
    comments: Comment[]
}

const initialState: CommentState = {
    comments: [],
}

export const commentSlice = createSlice({
    name: 'comment',
    initialState,
    reducers: {
        setComments: (state, action: PayloadAction<Comment[]>) => {
            state.comments = action.payload
        },
        addComment: (state, action: PayloadAction<Comment>) => {
            state.comments.push(action.payload)
        },
        removeComment: (state, action: PayloadAction<number>) => {
            state.comments = state.comments.filter((comment) => comment.id !== action.payload)
        }
    },
})

export const { setComments, addComment, removeComment } = commentSlice.actions

export default commentSlice.reducer