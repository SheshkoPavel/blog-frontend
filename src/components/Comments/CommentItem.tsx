import React from 'react';
import {commentsArray} from "../../types/commentsTypes";

const CommentItem = ({id, author, text, postId}: commentsArray) => {
    return (
        <div>
            <div style={{fontWeight: "bold", backgroundColor: "grey"}}>{author}</div>
            <div style={{marginBottom: 10}}>{text}</div>
        </div>
    );
};

export default CommentItem;