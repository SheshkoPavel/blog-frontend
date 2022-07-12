import React, {useEffect} from 'react';
import {NavLink} from "react-router-dom";
import {useAppDispatch} from "../../hooks";
import {fetchPosts} from "../../store/action-creators/postsAC";

interface postsProps {
    index: number;
    id: number;
    title: string;
    image?: string;
}

const Posts = (props: postsProps) => {

    return (
        <div style={{marginBottom: 30, textAlign: "center"}}>
            <div style={{marginBottom: 10}}>{props.index + '  - '}{props.title}</div>
            <NavLink to={'/posts/' + props.id}>
                <img src={`http://localhost:5000/postImages/${props.image}`} alt="post"
                     style={{height: 200, borderRadius: 20}}/>
            </NavLink>
        </div>
    );
};

export default Posts;