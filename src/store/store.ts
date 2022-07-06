import {configureStore} from "@reduxjs/toolkit";
import {userReducer} from "./reducers/usersReducer";
import {postsReducer} from "./reducers/postsReducer";

export const store = configureStore({
    reducer: {
        users: userReducer,
        posts: postsReducer,
    }
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch