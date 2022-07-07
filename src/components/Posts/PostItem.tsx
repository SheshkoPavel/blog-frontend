import React, {useEffect} from 'react';
import {useParams} from "react-router-dom";
import {useAppDispatch, useAppSelector} from "../../hooks";
import {fetchOnePost} from "../../store/action-creators/postsAC";
import Comments from "../Comments/Comments";
import './PostItem.scss'

const PostItem = () => {

    // Check is any user id in URL. If not, push my profile
    const {id} = useParams()

    const postId = Number(id)

    const {post, isLoading, error} = useAppSelector(state => state.posts)

    const dispatch = useAppDispatch()

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
            <div >
                Статья под номером {id}
            </div>
            {
                post.image ?
                    <img src={`http://localhost:5000/postImages/${post.image}`} alt="post main" style={{height: 200}}/>
                    : '...loading image'
            }

            <div>{post.content}</div>

            <Comments className='comments__content' postId={postId} />


        </section>
    );
};

export default PostItem;