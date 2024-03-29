import axios from "axios";
import {Dispatch} from "redux";
import {PostAction, PostActionTypes} from "../../types/posts";

export const fetchPosts = (limit?: number, page?: number) => async (dispatch: Dispatch<PostAction>) => {
    try {
        dispatch({type: PostActionTypes.FETCH_POSTS})
        if (limit && page) {
            const response = await axios.get(`http://localhost:5000/posts?limit=${limit}&page=${page}`);
            dispatch({type: PostActionTypes.FETCH_POSTS_SUCCESS, payload: response.data});
        }
        if (!limit && !page) {
            const response = await axios.get('http://localhost:5000/posts')
            dispatch({type: PostActionTypes.FETCH_POSTS_SUCCESS, payload: response.data})
        }

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
        const token = localStorage.getItem('token');
        let formData = new FormData();
        formData.append('title', title);
        formData.append('content', content);
        formData.append('status', status);
        formData.append('userId', userId.toString());
        formData.append('image', image);
        await axios.post('http://localhost:5000/posts',
            formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    Authorization: `Bearer ${token}`
                }
            }
        );
    } catch (e) {
       dispatch({type: PostActionTypes.FETCH_POSTS_ERROR, payload: "Ошибка выполнения операции"})
    }
}

export const loadAllUserPostsThunk = (userId: number) => async (dispatch: Dispatch<PostAction>) => {
    try {
        dispatch({type: PostActionTypes.FETCH_POSTS});
        const response = await axios.get(`http://localhost:5000/posts/user/${userId}`);
        dispatch({type: PostActionTypes.LOAD_ALL_USER_POSTS, payload: response.data});
    } catch (error) {
        dispatch({
            type: PostActionTypes.FETCH_POSTS_ERROR,
            payload: 'Error loading Post'
        });
    }
}

export const postToSavedThunk = (postId: number) => async (dispatch: Dispatch<PostAction>) => {
    try {
        const token = localStorage.getItem('token');
        await axios.patch('http://localhost:5000/posts', {updateId: postId, newPostStatus: 'SAVED'} ,
            {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });

    } catch (error) {
        dispatch({
            type: PostActionTypes.FETCH_POSTS_ERROR,
            payload: 'Error loading Post'
        });
    }
}

export const postToPublishedThunk = (postId: number) => async (dispatch: Dispatch<PostAction>) => {
    try {
        const token = localStorage.getItem('token');
        await axios.patch('http://localhost:5000/posts', {updateId: postId, newPostStatus: 'PUBLISHED'},
            {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });

    } catch (error) {
        dispatch({
            type: PostActionTypes.FETCH_POSTS_ERROR,
            payload: 'Error loading Post'
        });
    }
}

export const postToDeletedThunk = (postId: number) => async (dispatch: Dispatch<PostAction>) => {
    try {
        const token = localStorage.getItem('token');
        await axios.patch('http://localhost:5000/posts', {updateId: postId, newPostStatus: 'DELETED'},
            {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });

    } catch (error) {
        dispatch({
            type: PostActionTypes.FETCH_POSTS_ERROR,
            payload: 'Error loading Post'
        });
    }
}

export const editPostThunk = (updateId: number, newPostTitle: string, newPostContent: string) =>
    async (dispatch: Dispatch<PostAction>) => {
    try {
        const token = localStorage.getItem('token');
        await axios.patch('http://localhost:5000/posts', {updateId: updateId,
            newPostTitle: newPostTitle, newPostContent: newPostContent} , {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        const response = await axios.get(`http://localhost:5000/posts/${updateId}`)
        dispatch({type: PostActionTypes.FETCH_ONE_POSTS_SUCCESS, payload: response.data})
    } catch (error) {
        dispatch({
            type: PostActionTypes.FETCH_POSTS_ERROR,
            payload: 'Error loading Post'
        });
    }
}

export const filterPostsByStatusPublished = () =>
    async (dispatch: Dispatch<PostAction>) => {
    try {
        dispatch({type: PostActionTypes.FETCH_POSTS})
        dispatch({type: PostActionTypes.FILTER_POSTS_BY_STATUS_PUBLISHED})
    } catch (error) {
        dispatch({
            type: PostActionTypes.FETCH_POSTS_ERROR,
            payload: 'Error loading Posts'
        })
    }

}
export const filterPostsByStatusSaved = () =>
    async (dispatch: Dispatch<PostAction>) => {
        try {
            dispatch({type: PostActionTypes.FETCH_POSTS})
            dispatch({type: PostActionTypes.FILTER_POSTS_BY_STATUS_SAVED})
        } catch (error) {
            dispatch({
                type: PostActionTypes.FETCH_POSTS_ERROR,
                payload: 'Error loading Posts'
            })
        }

    }

export const addMultiAuthor = (postId: number, email: string) =>
    async (dispatch: Dispatch<PostAction>) => {
        try {
            const user = await axios.post(`http://localhost:5000/users/one`, {email: email});
            const post = await axios.get(`http://localhost:5000/posts/${postId}`);
            const hasPostAuthorId = post.data.author.some((el: any) => el.id === user.data.id);
            if (!!hasPostAuthorId) {
                dispatch({
                    type: PostActionTypes.LOAD_MESSAGE_FROM_SERVER,
                    payload: 'Пользователь уже добавлен в соавторы!'
                });
            } else {
                await axios.post(`http://localhost:5000/users/post`, {postId: postId, userId: user.data.id});
            }
        } catch (e) {
            console.log('Smth wrong')
        }

    }