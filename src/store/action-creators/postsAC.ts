import axios from "axios";
import {Dispatch} from "redux";
import {PostAction, PostActionTypes} from "../../types/posts";

export const fetchPosts = () => async (dispatch: Dispatch<PostAction>) => {
    try {
        dispatch({type: PostActionTypes.FETCH_POSTS})
        const response = await axios.get('http://localhost:5000/posts/all')
        dispatch({type: PostActionTypes.FETCH_POSTS_SUCCESS, payload: response.data.posts})
    } catch (error) {
        dispatch({
            type: PostActionTypes.FETCH_POSTS_ERROR,
            payload: 'Error loading Posts'
        })
    }
}