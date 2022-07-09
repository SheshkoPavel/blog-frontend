import React from 'react';
import {NavLink} from "react-router-dom";

const Posts = (props: any) => {

    return (
        <div style={{marginBottom: 30, textAlign: "center"}}>
            <div>{props.index + '  '}{props.title}</div>
            <NavLink to={'/posts/' + props.id}>
                <img src={`http://localhost:5000/postImages/${props.image}`} alt="post" style={{height: 200}}/>
            </NavLink>
        </div>
    );
};

export default Posts;