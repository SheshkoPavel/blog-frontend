import axios from "axios";
import {Dispatch} from "redux";
import {PostAction, PostActionTypes} from "../../types/posts";
import {log} from "util";

export const fetchPosts = () => async (dispatch: Dispatch<PostAction>) => {
    try {
        dispatch({type: PostActionTypes.FETCH_POSTS})
        const response = await axios.get('http://localhost:5000/posts')
        dispatch({type: PostActionTypes.FETCH_POSTS_SUCCESS, payload: response.data})
    } catch (error) {
        dispatch({
            type: PostActionTypes.FETCH_POSTS_ERROR,
            payload: 'Error loading Posts'
        })
    }
}

export const fetchOnePost = (id: string) => async (dispatch: Dispatch<PostAction>) => {
    try {
        dispatch({type: PostActionTypes.FETCH_ONE_POST, payload: id})
        const response = await axios.get(`http://localhost:5000/posts/${id}`)
        dispatch({type: PostActionTypes.FETCH_ONE_POSTS_SUCCESS, payload: response.data})
    } catch (error) {
        dispatch({
            type: PostActionTypes.FETCH_POSTS_ERROR,
            payload: 'Error loading Post'
        })
    }
}

export const sendPost = (title: string, content: string, status: string, userId: number, image: any) =>
    async (dispatch: Dispatch<PostAction> ) => {
    try {
        let formData = new FormData();
        formData.append('title', title);
        formData.append('content', content);
        formData.append('status', status);
        formData.append('userId', userId.toString());
        formData.append('image', image);
        const response = await axios.post('http://localhost:5000/posts',
            formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            }
        );
        dispatch({type: PostActionTypes.FETCH_POSTS_SUCCESS, payload: response.data})

    } catch (e) {
        console.log(e)
    }
}