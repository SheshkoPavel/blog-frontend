import React, {useEffect} from 'react';
import {Link, NavLink, useNavigate, useParams} from "react-router-dom";
import {useAppDispatch, useAppSelector} from "../../hooks";
import {
    fetchOnePost
} from "../../store/action-creators/postsAC";
import Comments from "../Comments/Comments";
import './PostItem.scss'
import ButtonsGroup from "./ButtonsGroup";

const PostItem = () => {


    const {id} = useParams()
    const postId = Number(id)

    const {post, isLoading, error, messageFromServer} = useAppSelector(state => state.posts)
    const {isAuth, user} = useAppSelector(state => state.auth)

    const date = new Date(post.createdAt)
    const niceDate = (date.toLocaleDateString())


    let hasRights;
    if (post.author && user) {
        hasRights = post.author.some((el: any) => el.id === user.id);
    }

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
            <h1 >
               {post.title}
            </h1>
            {
                post.image ?
                    <img src={`http://localhost:5000/postImages/${post.image}`} alt="post main"/>
                    : '...loading image'
            }

            {(isAuth && user?.id === post.userId) || (isAuth && hasRights)
                ?  <ButtonsGroup post={post} />
                : null
            }
            {messageFromServer
                ? <div style={{fontWeight: "bold", color: 'red', marginTop: 10}}>{messageFromServer}</div>
                : null
            }

            <div className={'post__text'}>{post.content}
                <div className={'post__time'}>{niceDate}</div>
            </div>

            <Comments className='comments__content' postId={postId} />


        </section>
    );
};

export default PostItem;