import React, {useEffect} from 'react';
import {Link, NavLink, useNavigate, useParams} from "react-router-dom";
import {useAppDispatch, useAppSelector} from "../../hooks";
import {
    fetchOnePost,
    postToDeletedThunk,
    postToPublishedThunk,
    postToSavedThunk
} from "../../store/action-creators/postsAC";
import Comments from "../Comments/Comments";
import './PostItem.scss'
import ButtonsGroup from "./ButtonsGroup";

const PostItem = () => {


    const {id} = useParams()
    const postId = Number(id)

    const {post, isLoading, error} = useAppSelector(state => state.posts)
    const {isAuth, user} = useAppSelector(state => state.auth)

    const dispatch = useAppDispatch()
    const navigate = useNavigate();

    useEffect(()=>{
        if (id !== undefined){
            dispatch(fetchOnePost(id))
        }
    },[id])


    if (isLoading) {
        return <h1>...loading of Posts</h1>
    }
    if (error) {
        return <h1>{error}</h1>
    }

    return (
        <section className='posts__content'>
            <h1 >
               {post.title}
            </h1>
            {
                post.image ?
                    <img src={`http://localhost:5000/postImages/${post.image}`} alt="post main" style={{height: 200}}/>
                    : '...loading image'
            }

            <div>{post.content}</div>

            {isAuth && user?.id === post.userId
                ?  <ButtonsGroup post={post} />
                : null
            }

            <Comments className='comments__content' postId={postId} />


        </section>
    );
};

export default PostItem;